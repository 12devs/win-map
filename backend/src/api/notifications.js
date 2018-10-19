import { Notification, Device } from '../models';
import fetch from 'node-fetch';
import config from 'config';

const keys = config.apiKeys;

const notifications = [
  {
    token: ['fRsHck8QmJI:APA91bGRNkFwQlbGK4gtXFmBJkpiX1DHDwKDmJ0mJ8VtrQ5We7bvKWcRRnq9sJVbxi6Kmh1A91AykJnfdhPiDgoF72O6UrCmPeRdKZD-1VyV0cJdQSeyFS4U0BcvakiUGB7G8BXQnMyp'],
    message: 'test message',
  },
  {
    token: [
      'fRsHck8QmJI:APA91bGRNkFwQlbGK4gtXFmBJkpiX1DHDwKDmJ0mJ8VtrQ5We7bvKWcRRnq9sJVbxi6Kmh1A91AykJnfdhPiDgoF72O6UrCmPeRdKZD-1VyV0cJdQSeyFS4U0BcvakiUGB7G8BXQnMyp',
      'fRsHck8QmJI:APA91bGRNkFwQlbGK4gtXFmBJkpiX1DHDwKDmJ0mJ8VtrQ5We7bvKWcRRnq9sJVbxi6Kmh1A91AykJnfdhPiDgoF72O6UrCmPeRdKZD-1VyV0cJdQSeyFS4U0BcvakiUGB7G8BXQnMyp'
    ],
    message: 'test message2 axaxa',
  }
];

const sendNotifications = () => {
  // Notification.findAll({
  //   where: {
  //     sent_at: null
  //   },
  //
  // })
  //   .then(result => {
  //     console.log(result);
  //   })

  notifications.forEach(value => {

    const options = {
      method: 'POST',
      body: JSON.stringify({
        notification: {
          title: "test title",
          body: value.message,
          click_action: "http://localhost:8081",
          sound: "default"
        },
        registration_ids: value.token,
      }),
      headers: {
        Authorization: `key=${keys.fcm}`,
        'Content-Type': 'application/json',
      },
    };

    fetch('https://fcm.googleapis.com/fcm/send', options)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err);
      });
  })


}

export {
  sendNotifications,
}