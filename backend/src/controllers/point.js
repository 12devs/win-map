import { Point, Account } from './../models';
import { getStationId, getHistoricalData } from '../api/wind';
import _ from 'lodash';

export default {

  async save(req, res) {
    try {
      const { user } = req;
      const { point, stations } = req.body;
      console.log(point, stations);
      const { lat, lng } = point;
      point.account_id = user.id;
      point.station_id = await getStationId({ lat, lng });
      const savedPoint = await Point.create(point);
      let station;
      let stationsData;
      if (!stations || stations.indexOf(savedPoint.station_id) === -1) {
        station = await getHistoricalData(savedPoint.station_id);
        stationsData = {
          [savedPoint.station_id]:station
        }
      }
      res.status(200).json({ point, stationsData})
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message })
    }
  },

  async withData(req, res) {
    try {
      const points = await Point.findAll({ where: { account_id: req.user.id } });
      const stations = _.uniqBy(points, (elem => elem.station_id)).map(elem => elem.station_id);
      const promises = stations.map(elem => getHistoricalData(elem));
      const stsData = await Promise.all(promises);
      const stationsData = {};
      stsData.forEach((elem, i) => {
        stationsData[stations[i]] = elem
      });
      res.status(200).json({ points, stations, stationsData })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async deletePoint(req, res) {
    try {
      const { point } = req.body;
      await Point.destroy({ where: { id: point.id } });
      res.status(200).json({ message: point.id + ' successful deleted' })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async movePoint(req, res) {
    try {
      const { point } = req.body;
      await Point.destroy({ where: { id: point.id } });
      res.status(200).json({ message: point.id + ' successful deleted' })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
