import { sendNotifications } from './sendNotifications';
import { createNotifications } from './createNotifications';

const createAndSendNotifications = () => {
  return createNotifications()
    .then(() => {
      return sendNotifications()
    })
    .then(()=>{
      console.log('sendNotifications complete')
    })
};

export {
  createAndSendNotifications
}

createAndSendNotifications();
