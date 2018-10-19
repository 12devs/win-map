import React from 'react';
import { askForPermissioToReceiveNotifications } from '../services/push-notification';

const NotificationButton = () => (
  <button onClick={askForPermissioToReceiveNotifications} >
    Clique aqui para receber notificações
  </button>
);

export default NotificationButton;
