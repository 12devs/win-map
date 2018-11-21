import firebase from 'firebase/app';
import 'firebase/messaging';
import services from '../services';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./public/firebase-messaging-sw.js')
//     .then((registration) => {
//       firebase.messaging().useServiceWorker(registration);
//     })
//     .catch((err) => {
//       console.log('Service worker registration failed, error:', err);
//     });
// }
//
// export const initializeFirebase = () => {
//   firebase.initializeApp({
//     messagingSenderId: "18277453447"
//   });
//
//   firebase.messaging().onMessage((payload) => {
//     showNotification(payload.notification)
//   });
// };
//
//
export const askForPermissioToReceiveNotifications = () => {
  // try {
  //   let token;
  //   const messaging = firebase.messaging();
  //   return messaging.requestPermission()
  //     .then(() => {
  //       return messaging.getToken();
  //     })
  //     .then(res => {
  //       token = res;
  //       return services.saveNotificationToken(token);
  //     })
  //     .then(() => {
  //       return token;
  //     })
  // } catch (error) {
  //   console.error(error);
  // }
  console.log('askForPermissioToReceiveNotifications')
  window.OneSignal.registerForPushNotifications();
  return 1;
}

const subscribeToNotifications = () => {
  console.log('subscribeToNotifications')
  OneSignal.push(function () {
    OneSignal.registerForPushNotifications();
    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
      if (isEnabled)
        console.log("Push notifications are enabled!");
      else
        console.log("Push notifications are not enabled yet.");
    });
  });
  // OneSignal.push(function() {
  //   OneSignal.showHttpPrompt();
  // });
}

//
// export const deleteToken = () => {
//
//   try {
//     const messaging = firebase.messaging();
//     let token;
//     return messaging.getToken()
//       .then(res => {
//         token = res;
//         return messaging.deleteToken(token);
//       })
//       .then(() => {
//         services.deleteNotificationToken(token);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// const showNotification = (notification) => {
//   if (!("Notification" in window)) {
//     return;
//   } else if (Notification.permission === "granted") {
//     const currentNotification = new Notification(notification.title, notification);
//   } else if (Notification.permission !== 'denied') {
//     Notification.requestPermission(function (permission) {
//       if (permission === "granted") {
//         const currentNotification = new Notification(notification.title, notification);
//       }
//     });
//   }
// }

const initOneSignal = () => {
  const OneSignal = window.OneSignal || [];
  OneSignal.push(() => {
    OneSignal.init({
      appId: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
      autoRegister: false,
      notifyButton: {
        enable: false,
      },
      welcomeNotification: {
        enable: true,
        title: 'test',
        message: 'teste tetwet yw'
      },
    });
  });

  OneSignal.push(function () {
    OneSignal.getUserId(function (userId) {
      console.log("OneSignal User ID:", userId);
    });
  });
}

export {
  initOneSignal,
  subscribeToNotifications,
}
