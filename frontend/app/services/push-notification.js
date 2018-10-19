import firebase from 'firebase';

// import SW from './firebase-messaging-sw';
//
// navigator.serviceWorker
//   .register()
//   .then((registration) => {
//     console.log(registration)
//     firebase.messaging().useServiceWorker(registration);
//   });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}

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
    console.log('token do usuário:', token);

    return token;
  } catch (error) {
    console.error(error);
  }
}