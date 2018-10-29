import fetch from 'node-fetch';
import config from 'config';
import logger from '../logger';
import { Notification, Device, Account } from '../models';

const keys = config.apiKeys;

const sendNotifications = async () => {

  logger.info('sendNotifications|START');

  let offset = 0;
  let limit = 1;

  do {
    const query = {
      offset,
      limit,
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

    try {
      const notifications = await Notification.findAll(query);

      if (!notifications.length) break;

      const messages = createNotifications(notifications);
      prepareToSend(messages);
    } catch (error) {
      logger.error('sendNotifications|ERROR', error)
    }

    offset++;
  } while (true);

}

const createNotifications = (messages) => {
  const currentMessages = messages.map(item => {
    const { devices } = item.account;
    const tokens = devices.map(device => device.token);

    return {
      id: item.id,
      registration_ids: tokens,
      notification: {
        title: "wind-map", //@TODO
        icon: "https://st3.depositphotos.com/14847044/17089/i/450/depositphotos_170894478-stock-photo-meteorology-wild-sign.jpg", //@TODO
        body: item.message,
        click_action: "http://localhost:8081", //@TODO
        sound: "default",
      },
    };
  });

  return currentMessages;
}

const prepareToSend = (messages) => {

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
};

export {
  sendNotifications,
}
