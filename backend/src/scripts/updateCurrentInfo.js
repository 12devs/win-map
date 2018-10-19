import { Place, Danger, Account, Subscription, Device } from './../models';
import BluebirdPromise from 'bluebird';

const query = {
  where: {
    id: 1,
  },
  include: [{
    model: Account,
    as:"account",
    include: [{
      model: Device,
      as: 'devices'
    }]
  }],
};


Subscription.findAll(query)
  .then(res => {
    console.log(JSON.stringify(res, null, 4));
  })
  .catch(err => console.log(err));



