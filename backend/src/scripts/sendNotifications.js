import { Notification, Device, Account } from '../models/index';
import fetch from 'node-fetch';
import config from 'config';

const keys = config.apiKeys;

const sendNotifications = () => {

  const query = {
    where: {
      sent_at: null,
    },
    include: [{
      model: Account,
      as: "account",
      include: [{
        model: Device,
        as: 'devices'
      }]
    }],
  };

  Notification.findAll(query)
    .then(res => {

      const messages = res.map(item => {
        const { devices } = item.account;
        const tokens = devices.map(device => device.token);

        return {
          id: item.id,
          registration_ids: tokens,
          notification: {
            title: "wind-map", //@TODO
            body: item.message,
            click_action: "http://localhost:8081", //@TODO
            sound: "default",
          },
        };
      });

      return messages;
    })
    .then(messages => {

      messages.forEach(value => {

        const options = {
          method: 'POST',
          body: JSON.stringify(value),
          headers: {
            Authorization: `key=${keys.fcm}`,
            'Content-Type': 'application/json',
          },
        };

        sendMessage(options, value.id);
      });
    })
    .catch(err => console.log(err));

}

const sendMessage = (options, ids) => {

  return fetch('https://fcm.googleapis.com/fcm/send', options)
    .then(result => {

      if (result.status === 200) {

        const change = {
          sent_at: Date(),
        };

        const query = {
          where: {
            id: ids,
          }
        };

        Notification.update(change, query);
      }
    })
    .catch(err => {

      return Promise.reject(err);
    });
}

export {
  sendNotifications,
}

sendNotifications();
