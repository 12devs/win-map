import { Point, Account, Danger, Place, Subscription, Notification, Station } from './../models';
import { getStationId, getCurrenData } from '../api/wind';
import getWindRoseData from '../api/windRoseParses';

const getStationsData = async (stations) => {
  const promises = stations.map(elem => {
    return getCurrenData(elem.station_id)
      .then(result => {
        return {
          current: {
            dir: result.direction,
            speed: result.speed,
          },
          history: {},
          period: 0,
        };
      });
  });
  const promisesHistorical = stations.map(elem => getWindRoseData(elem.lat, elem.lng));
  const stsData = await Promise.all(promises);
  const historicalData = await Promise.all(promisesHistorical);

  return stsData.reduce((acc, elem, i) => {
    elem = Object.assign(elem, historicalData[i]);
    acc[stations[i].station_id] = elem;
    return acc;
  }, {});
};

export default {

  async save(req, res) {
    try {
      const { danger, stations, place } = req.body;
      if (danger) {
        const { lat, lng } = danger;
        danger.station_id = await getStationId({ lat, lng });
        const savedDanger = danger;
        savedDanger.dangerRadius = 5000;
        savedDanger.lat = Number(lat);
        savedDanger.lng = Number(lng);
        savedDanger.id = +new Date();
        let stationsData;
        if (!stations || stations.indexOf(savedDanger.station_id) === -1) {
          stationsData = await getStationsData([{
            station_id: savedDanger.station_id,
            lat: savedDanger.lat,
            lng: savedDanger.lng,
          }]);
        }
        res.status(200).json({ danger: savedDanger, stationsData });
      } else {
        const { lat, lng } = place;
        place.station_id = await getStationId({ lat, lng });
        const savedPlace = place;
        savedPlace.lat = Number(lat);
        savedPlace.lng = Number(lng);
        savedPlace.id = `${+new Date()}`;

        let stationsData;
        if (!stations || stations.indexOf(savedPlace.station_id) === -1) {
          stationsData = await getStationsData([{
            station_id: savedPlace.station_id,
            lat: savedPlace.lat,
            lng: savedPlace.lng,
          }]);
        }
        res.status(200).json({ place: savedPlace, stationsData });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async movePoint(req, res) {
    try {
      const { danger, stations, place } = req.body;
      if (danger) {
        const { lat, lng } = danger;
        danger.station_id = await getStationId({ lat, lng });
        const savedDanger = danger;
        savedDanger.lat = Number(lat);
        savedDanger.lng = Number(lng);
        let stationsData;
        if (!stations || stations.indexOf(savedDanger.station_id) === -1) {
          stationsData = await getStationsData([{
            station_id: savedDanger.station_id,
            lat: savedDanger.lat,
            lng: savedDanger.lng
          }]);
        }
        res.status(200).json({ danger: savedDanger, stationsData });
      } else {
        const { lat, lng } = place;
        place.station_id = await getStationId({ lat, lng });
        const savedPlace = place;
        savedPlace.lat = Number(lat);
        savedPlace.lng = Number(lng);
        let stationsData;
        if (!stations || stations.indexOf(savedPlace.station_id) === -1) {
          stationsData = await getStationsData([{
            station_id: savedPlace.station_id,
            lat: savedPlace.lat,
            lng: savedPlace.lng
          }]);
        }
        res.status(200).json({ place: savedPlace, stationsData });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }
};
