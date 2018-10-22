import { Place, Danger, Account, Subscription, Device, Wind } from './../models';
import { getCurrenData } from './../api/wind';
import BluebirdPromise from 'bluebird';
import _ from 'lodash';

// const query = {
//   where: {
//     id: 1,
//   },
//   include: [{
//     model: Account,
//     as:"account",
//     include: [{
//       model: Device,
//       as: 'devices'
//     }]
//   }],
// };

const query = {
  where: {},
  include: [
    // { all: true, }
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

const makeNotifications = async () => {
  let offset = 0;
  let limit = 1;
  let subscription;
  let query;
  do {
    query = {
      where: {},
      offset,
      limit,
      include: [
        // { all: true, }
        {
          model: Place,
          as: "place",
        },
        {
          model: Danger,
          as: "danger",
        }
      ],
      // raw: true,
    };
    subscription = await Subscription.findAll(query);
    if (!subscription.length){
      break
    }
    await SubscriptionHandler(subscription[0]);
    offset++;
  } while (true)
};

// Subscription.findAll(query)
//   .then(res => {
//     console.log(JSON.stringify(res, null, 4));
//   })
//   .catch(err => console.log(err));

// makeNotifications();

const SubscriptionHandler = async (subscription, expiredTime = 86400000) => {
  let wind = await Wind.findOne({
    where: {
      station_id: subscription.place.station_id,
      updated_at: {
        $gt: new Date(new Date() - 1)
      },
    }
  });
  if (!wind){
    wind = await getCurrenData(subscription.place.station_id);
    await Wind.upsert(wind, {where: {station_id: wind.station_id}})
  }
  console.log('wind', wind);

};


makeNotifications()
