import services from '../services';

const OneSignal = window.OneSignal || [];

const getIsPushNotificationsSupported = () => {
  try {
    return OneSignal.isPushNotificationsSupported();
  } catch (err) {
    console.log(err);
    return null;
  }
};
const isPushSupported = getIsPushNotificationsSupported();

const subscribeToNotifications = () => {
  if (!isPushSupported) return;

  console.log('subscribeToNotifications');
  OneSignal.push(() => {
    OneSignal.registerForPushNotifications();
    OneSignal.getUserId((userId) => {
      console.log("OneSignal User ID:", userId);
      services.saveNotificationToken(userId);
    });
  });
};

const unSubscribeToNotifications = () => {
  if (!isPushSupported) return;

  OneSignal.push(() => {
    OneSignal.getUserId((userId) => {
      console.log("OneSignal User ID:", userId);
      services.deleteNotificationToken(userId);
    });
    OneSignal.setSubscription(false);
  });
};


const initOneSignal = () => {
  if (!isPushSupported) return;

  OneSignal.push(() => {
    OneSignal.init({
      appId: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
      autoRegister: false,
      persistNotification: false,
      notifyButton: {
        enable: false,
      },
      welcomeNotification: {
        enable: true,
        title: 'wind-wap: Thanks for subscribing!',
        message: 'first message.'
      },
    });
  });
};

const isPushNotificationsEnabled = () => {
  return new Promise(resolve => {
    if (!isPushSupported) {
      resolve(false);
      return;
    }
    OneSignal.push(() => {
      OneSignal.isPushNotificationsEnabled((isEnabled) => {
        resolve(isEnabled)
      });
    });
  });
};

export {
  initOneSignal,
  subscribeToNotifications,
  unSubscribeToNotifications,
  isPushNotificationsEnabled,
}
