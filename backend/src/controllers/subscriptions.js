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
      const startTime = new Date();
      await  BluebirdPromise.mapSeries(subscriptionsForSaving, subscription => {
        return Subscription.update(subscription, {
          where: {
            account_id: user.id,
            place_id: subscription.place_id,
            danger_id: subscription.danger_id
          }
        })
          .then(res => {
            if (!res[0]) {
              Subscription.create(subscription)
            }
          })
      });
      await Subscription.destroy({
        where: {
          account_id: user.id,
          updated_at: {
            $lt: startTime
          }
        }
      });

      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async onViewNotification(req, res) {
    try {
      const { notification } = req.body;
      delete notification.created_at;
      delete notification.updated_at;
      delete notification.deleted_at;
      if (notification.view_at === '') {
        delete notification.view_at;
      }
      if (notification.sent_at === '') {
        delete notification.sent_at;
      }
      await Notification.update(notification, { where: { id: notification.id } });
      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async ViewAllNotification(req, res) {
    try {
      const { user } = req;
      await Notification.update({view_at: new Date()}, { where: { account_id: user.id } });
      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },
}
