import { sendNotifications } from './sendNotifications';
import { createNotifications } from './createNotifications';
import logger from '../logger';

const createAndSendNotifications = () => {
  return createNotifications()
    .then(() => {
      return sendNotifications()
    })
    .then(()=>{
      logger.info('sendNotifications|COMPLETED');
    })
};

export {
  createAndSendNotifications
}

createAndSendNotifications();
