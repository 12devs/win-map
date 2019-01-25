import { Place, Danger, Account, Device } from './../models';
import { Notification } from "../models"

export default {

  async saveToken(req, res) {
    try {
      const { user } = req;
      const { token } = req.body;

      await Device.findOrCreate({where:{ account_id: user.id, token }, defaults: { account_id: user.id, token }});

      return res.status(200).json({ message: 'created' });
    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  },

  async deleteToken(req, res) {
    try {
      const { user } = req;
      const { token } = req.body;

      await Device.destroy({ where: { account_id: user.id, token } });

      return res.status(200).json({ message: 'deleted' });
    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  },

  async get(req, res) {
    try {
      const { user } = req;
      const notifications = await  Notification.findAll({ where: { account_id: user.id } })

      return res.status(200).json(notifications);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
