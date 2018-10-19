import { Place, Danger, Account, Subscription } from './../models';
import BluebirdPromise from 'bluebird';

export default {

  async save(req, res) {
    try {
      const { user } = req;
      const { subscriptions } = req.body;
      await BluebirdPromise.mapSeries(subscriptions, subscription => {
        subscription.account_id = user.id;
        const { account_id, place_id, danger_id } = subscription;
        return Subscription.update({ account_id, place_id, danger_id }, subscription, { upsert: true })
      });

      res.status(200).json({ message: "subscriptions was saved" })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
}
