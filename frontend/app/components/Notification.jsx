import React from 'react';
import { askForPermissioToReceiveNotifications, deleteToken } from '../services/push-notification';

const NotificationButton = () => (
  <div>
    <button onClick={askForPermissioToReceiveNotifications}>
      Subscribe to notifications
    </button>
    <button onClick={deleteToken}>
      unsubscribe to notifications
    </button>
  </div>
);

export default NotificationButton;
