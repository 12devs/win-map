import config from 'config';
import logger from '../logger';
import { Notification, Device, Account, Subscription, Danger } from '../models';
import https from 'https';

const sendNotification = data => {

  return new Promise((resolve, reject) => {

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic OWMxNDIzNTMtZGRlMC00Yjk4LTkyMTctNDBhMzQ5MmVkNDU2"
    };

    const options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    const req = https.request(options, res => {
      res.on('data', data => {
        resolve(data)
      });
    });

    req.on('error', e => {
      reject(e)
    });

    req.write(JSON.stringify(data));
    req.end();
  });
};


const sendNotifications = async () => {

  logger.info('sendNotifications|START');

  let limit = 1;

  do {
    const query = {
      limit,
      where: {
        sent_at: null,
      },
      subQuery: false,
      order: ['id'],
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
      console.log('notifications.length', notifications.length, limit);
      if (!notifications.length) break;

      const options = createOptions(notifications);
      await sendMassages(options);
    } catch (error) {
      logger.error('sendNotifications|ERROR', error)
    }

  } while (true);
};

const createOptions = (notifications) => {
  const currentMessages = notifications.map(item => {
    const { devices } = item.account;
    const { message, id } = item;
    const tokens = devices.map(device => device.token);
    return {
      id,
      tokens,
      message,
    };
  });

  return currentMessages;
};

const sendMassages = (options) => {

  const promises = options.map(item => {
    const { message, tokens, id } = item;
    return sendMessage(message, tokens)
      .then(() => {
        const change = { sent_at: Date() };
        const query = { where: { id } };
        return Notification.update(change, query);
      })
  });
  return Promise.all(promises)
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res);
    })
};

const sendMessage = (text, ids) => {
  console.log('sendMessage', text, ids);
  const message = {
    app_id: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
    contents: { "en": text },
    include_player_ids: ids,
  };

  return sendNotification(message)
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
        return Notification.update(change, query);
      }
    });
};

export {
  sendNotifications,
}
