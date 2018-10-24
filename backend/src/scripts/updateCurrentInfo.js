import { Place, Danger, Account, Subscription, Device, Notification, Station } from './../models';
import { getCurrenData } from './../api/wind';
import BluebirdPromise from 'bluebird';
import _ from 'lodash';
import geolib from 'geolib';

const getCompassDirection = (from, to) => {
  const geolibGetCompassDirection = geolib.getCompassDirection(from, to).exact;
  switch (geolibGetCompassDirection) {
    case "N":
      return 'North';
    case "W":
      return 'West';
    case "E":
      return 'East';
    case "S":
      return 'South';
    default:
      return geolibGetCompassDirection
  }
};

const createNotifications = async () => {
  let offset = 0;
  let limit = 1;
  let subscription;
  let query;
  subscription = JSON.parse(JSON.stringify(await Subscription.findAll())).map(e => e.id);
  console.log(subscription);
  do {
    query = {
      where: {},
      offset,
      limit,
      subQuery: false,
      order: ['id'],
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
    subscription = JSON.parse(JSON.stringify(await Subscription.findAll(query)));
    if (!subscription.length) {
      break
    }
    await SubscriptionHandler(subscription[0]);
    offset++;
  } while (true)
};

const SubscriptionHandler = async (subscription, expiredTime = 86400000) => {
  let wind = await Station.findOne({
    where: {
      station_id: subscription.place.station_id,
      updated_at: {
        $gt: new Date(new Date() - expiredTime)
      },
    }
  });
  if (!wind) {
    wind = await getCurrenData(subscription.place.station_id);
    await Station.update(wind, { where: { station_id: wind.station_id } })
      // .then(res => {
      //   if (!res[0]) {
      //     Wind.create(wind)
      //   }
      // })
  }
  const direction = getCompassDirection(subscription.danger, subscription.place);
  if (subscription.last_message) {
    if (subscription.last_message === 'end' && direction === wind.direction) {
      subscription.last_message = 'start';
      await Notification.create({
        account_id: subscription.account_id,
        message: `Wind started from ${subscription.danger.name} to ${subscription.place.name}`
      });
    }

    if (subscription.last_message === 'start' && direction !== wind.direction) {
      subscription.last_message = 'end';
      await Notification.create({
        account_id: subscription.account_id,
        message: `Wind finished from ${subscription.danger.name} to ${subscription.place.name}`
      });
    }
  } else {
    if (direction === wind.direction) {
      subscription.last_message = 'start';

      await Notification.create({
        account_id: subscription.account_id,
        message: `Wind blows from ${subscription.danger.name} to ${subscription.place.name}`
      });
    } else {
      subscription.last_message = 'end';
      await Notification.create({
        account_id: subscription.account_id,
        message: `Wind don't blows from ${subscription.danger.name} to ${subscription.place.name}`
      });
    }
  }
  const { account_id, place_id, danger_id } = subscription;
  await Subscription.update(subscription, { where: { account_id, place_id, danger_id } });
  console.log(subscription.id);
};

createNotifications();

export {
  createNotifications
}