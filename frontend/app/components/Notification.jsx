import React from 'react';
import { askForPermissioToReceiveNotifications } from '../services/push-notification';

const NotificationButton = () => (
  <button onClick={askForPermissioToReceiveNotifications} >
    Subscribe to notifications
  </button>
);

export default NotificationButton;
