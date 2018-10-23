import firebase from 'firebase/app';
import 'firebase/messaging';

import services from '../services';

navigator.serviceWorker
  .register('./public/firebase-messaging-sw.js')
  .then((registration) => {
    firebase.messaging().useServiceWorker(registration);
  })
  .catch((err) => {
    console.log('Service worker registration failed, error:', err);
  });

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "18277453447"
  });

  firebase.messaging().onMessage((payload) => {
    showNotification(payload.notification)
  });
};


export const askForPermissioToReceiveNotifications = () => {
  try {
    let token;
    const messaging = firebase.messaging();
    return messaging.requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(res => {
        token = res;
        console.log(token);
        return services.saveNotificationToken(token);
      })
      .then(() => {
        return token;
      })
  } catch (error) {
    console.error(error);
  }
}

export const deleteToken = () => {

  try {
    const messaging = firebase.messaging();
    let token;
    return messaging.getToken()
      .then(res => {
        token = res;
        return messaging.deleteToken(token);
      })
      .then(() => {
        services.deleteNotificationToken(token);
      });
  } catch (error) {
    console.error(error);
  }
}

const showNotification = (notification) => {
  if (!("Notification" in window)) {
    return;
  } else if (Notification.permission === "granted") {
     const  currentNotification = new Notification(notification.title, notification);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        const currentNotification = new Notification(notification.title, notification);
      }
    });
  }
}
