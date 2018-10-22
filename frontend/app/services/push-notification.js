import firebase from 'firebase';
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
};

export const askForPermissioToReceiveNotifications = () => {
  try {
    let token;
    const messaging = firebase.messaging();
    return messaging.requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then(res => {
        token = res;
        return services.saveNotificationToken(token);
      })
      .then(()=>{
        return token
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
      })
  } catch (error) {
    console.error(error);
  }
}
