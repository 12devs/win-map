import { Notification, Device, Account } from '../models';
import fetch from 'node-fetch';
import config from 'config';

const keys = config.apiKeys;

const sendNotifications = () => {

  const query = {
    where: {
      // id: 1,
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
          registration_ids: tokens,
          notification: {
            title: "wind-map", //@TODO
            body: item.message,
            click_action: "http://localhost:8081", //@TODO
            sound: "default",
          },
        };
      });

      console.log(messages);
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

        fetch('https://fcm.googleapis.com/fcm/send', options)
          .then(result => {

            //@TODO
            console.log(result)
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => console.log(err));

}

export {
  sendNotifications,
}