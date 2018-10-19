import { Place, Danger, Account, Device } from './../models';
import { getStationId, getHistoricalData } from '../api/wind';

export default {

  async save(req, res) {
    try {
      const { user } = req;
      const { notifications } = req.body;

      point.station_id = await getStationId({ lat, lng });
      const savedPoint = await Point.create(point);
      let stationsData;
      if (!stations || stations.indexOf(savedPoint.station_id) === -1) {
        stationsData = {
          [savedPoint.station_id]: await getHistoricalData(savedPoint.station_id),
        }
      }

      return res.status(200).json({ point: savedPoint, stationsData });
    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  },

  async saveToken(req, res) {
    try {
      const { user } = req;
      const { token } = req.body;

      const device = await Device.create({ account_id: user.id, token });

      return res.status(200).json({ message: 'created' });
    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  },

  async deleteToken(req, res) {
    try {
      const { user } = req;
      const { token } = req.body;

      const device = await Device.destroy({ where: { account_id: user.id, token } });

      return res.status(200).json({ message: 'deleted' });
    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  }

}
