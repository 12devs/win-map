import { Point, Account, Danger, Place, Subscription, Notification, Station } from './../models';
import { getStationId, getHistoricalData, getDailyHistoricalData } from '../api/wind';
import _ from 'lodash';

export default {

  async save(req, res) {
    try {
      const { user } = req;
      const { danger, stations, place } = req.body;
      if (danger) {
        const { lat, lng } = danger;
        danger.account_id = user.id;
        danger.station_id = await getStationId({ lat, lng });
        const savedDanger = await Danger.create(danger);
        let stationsData;
        if (!stations || stations.indexOf(savedDanger.station_id) === -1) {
          stationsData = {
            [savedDanger.station_id]: await getHistoricalData(savedDanger.station_id)
          }
        }
        res.status(200).json({ danger: savedDanger, stationsData })
      } else {
        const { lat, lng } = place;
        place.account_id = user.id;
        place.station_id = await getStationId({ lat, lng });
        const savedPlace = await Place.create(place);
        let stationsData;
        if (!stations || stations.indexOf(savedPlace.station_id) === -1) {
          stationsData = {
            [savedPlace.station_id]: await getHistoricalData(savedPlace.station_id)
          }
        }
        res.status(200).json({ place: savedPlace, stationsData })
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message })
    }
  },

  async withData(req, res) {
    try {
      const places = await Place.findAll({ where: { account_id: req.user.id } });
      const dangers = await Danger.findAll({ where: { account_id: req.user.id } });
      const notifications = await Notification.findAll({ where: { account_id: req.user.id } });
      const query = {
        where: { account_id: req.user.id },
        include: [
          {
            model: Place,
            as: "place",
          },
          {
            model: Danger,
            as: "danger",
          }
        ],
      };
      let subscriptions = await Subscription.findAll(query);
      subscriptions = JSON.parse(JSON.stringify(subscriptions));
      let temp = subscriptions.reduce((acc, curent) => {
        const { place_id, danger_id, danger, place } = curent;
        if (acc[place_id]) {
          acc[place_id].danger.push({
            value: danger_id,
            label: danger.name,
          })
        } else {
          acc[place_id] = {
            place: {
              value: place_id,
              label: place.name,
            },
            danger: [{
              value: danger_id,
              label: danger.name,
            }]
          }
        }
        return acc
      }, {});
      const notificationSettings = [];
      for (let key in temp){
        notificationSettings.push(temp[key])
      }
      const stations = _.uniqBy([...places, ...dangers], (elem => elem.station_id)).map(elem => elem.station_id);
      const promises = stations.map(elem => getHistoricalData(elem));
      const stsData = await Promise.all(promises);
      const stationsData = {};
      stsData.forEach((elem, i) => {
        stationsData[stations[i]] = elem
      });
      res.status(200).json({ places, dangers, stations, stationsData, notificationSettings, notifications })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message })
    }
  },

  async deletePoint(req, res) {
    try {
      const { danger, place } = req.body;
      if (danger) {
        await Danger.destroy({ where: { id: danger.id } });
        await Subscription.destroy({ where: { danger_id: danger.id} });
        res.status(200).json({ message: danger.id + ' successful deleted' })
      } else {
        await Place.destroy({ where: { id: place.id } });
        await Subscription.destroy({ where: { place_id: place.id} });
        res.status(200).json({ message: place.id + ' successful deleted' })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async movePoint(req, res) {
    try {
      const { danger, stations, place } = req.body;
      if (danger) {
        const { lat, lng } = danger;
        danger.station_id = await getStationId({ lat, lng });
        const savedDanger = (await Danger.update(danger, {
          where: { id: danger.id },
          returning: true,
          plain: true
        }))[1];
        let stationsData;
        if (!stations || stations.indexOf(savedDanger.station_id) === -1) {
          stationsData = {
            [savedDanger.station_id]: await getHistoricalData(savedDanger.station_id)
          }
        }
        res.status(200).json({ danger: savedDanger, stationsData })
      } else {
        const { lat, lng } = place;
        place.station_id = await getStationId({ lat, lng });
        const savedPlace = (await Place.update(place, { where: { id: place.id }, returning: true, plain: true }))[1];
        let stationsData;
        if (!stations || stations.indexOf(savedPlace.station_id) === -1) {
          stationsData = {
            [savedPlace.station_id]: await getHistoricalData(savedPlace.station_id)
          }
        }
        res.status(200).json({ place: savedPlace, stationsData })
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message })
    }
  }
}
