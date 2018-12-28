import logger from '../logger';
import { Notification, Device, Account, Subscription, Danger } from '../models';
import https from 'https';
import BluebirdPromise from 'bluebird';

const sendNotification = data => {

  return new Promise((resolve, reject) => {

    if (!data.include_player_ids.length){
      resolve({})
    }

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

  const accounts = await Account.findAll({ attributes: ['id'], raw: true });
  console.log('accounts', accounts);
  await  BluebirdPromise.mapSeries(accounts, async account => {
    const notifications = await Notification.findAll({ where: { account_id: account.id, sent_at: null } });
    const tokens = await Device.findAll({ where: { account_id: account.id } }).map(device => device.token);

    if (!notifications.length) {
      return
    }
    console.log(tokens);
    const promises = notifications.map(notification => {
      const { id, message } = notification;
      const options = {
        id,
        tokens,
        message,
      };
      return sendMessage(options)
        .then(res => {
          const change = { sent_at: Date() };
          const query = { where: { id } };
          return Notification.update(change, query);
        });
    });

    return Promise.all(promises)
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      })
  });
};

const sendMessage = (options) => {
  const { message, tokens } = options;

  const opt = {
    app_id: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
    contents: { "en": message },
    include_player_ids: tokens,
  };

  return sendNotification(opt)
};

const welcomeMessage = (include_player_ids) => {
  const options = {
    message: "Welcome to wind-map",
    tokens: include_player_ids
  };
  return sendMessage(options);
};

export {
  sendNotifications,
  welcomeMessage,
}
