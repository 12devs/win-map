import firebase from 'firebase';

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
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log(token);

    return token;
  } catch (error) {
    console.error(error);
  }
}