import { Place, Danger, Account, Device, Subscription, Notification } from './../models';
import { getStationId, getHistoricalData } from '../api/wind';
import BluebirdPromise from 'bluebird';

export default {

  async save(req, res) {
    try {
      const { user } = req;
      const { subscriptions } = req.body;
      const subscriptionsForSaving = [];
      subscriptions.forEach(place => {
        (place.danger || []).forEach(danger => {
          const subscription = {
            place_id: place.place.value,
            danger_id: danger.value,
            account_id: user.id,
          };
          subscriptionsForSaving.push(subscription)
        });
      });
      await Subscription.destroy({ where: { account_id: user.id } });
      await  BluebirdPromise.mapSeries(subscriptionsForSaving, subscription => {
        return Subscription.create(subscription)
      });
      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async onViewNotification(req, res) {
    try {
      const { user } = req;
      const { notification } = req.body;
      await Notification.update(notification, {where:{account_id: user.id, id: notification.id}});
      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },

}
