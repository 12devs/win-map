import { Place, Danger, Account, Device } from './../models';
import { getStationId, getHistoricalData } from '../api/wind';

export default {

  async saveToken(req, res) {
    try {
      const { user } = req;
      const { token } = req.body;

      const device = await Device.findOrCreate({where:{ account_id: user.id, token }, defaults: { account_id: user.id, token }});

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
