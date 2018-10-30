import { fetch } from './fetch';

const login = (login, password) => {
  console.log(login, password);
  return fetch('post', '/publicRouts/login', { login, password });
};

const register = (login, password) => {
  return fetch('post', '/publicRouts/register', { login, password });
};

const test = () => {
  return fetch('post', '/api/test', { data: 'dfdfdfdfdfdf' });
};

const savePoint = (point) => {
  return fetch('post', '/api/points/save', point);
};

const movePoint = (point) => {
  return fetch('post', '/api/points/move', point);
};

const deletePoint = (point) => {
  return fetch('post', '/api/points/delete', point);
};

const getInfo = (point) => {
  return fetch('post', '/api/points/withData', point);
};

const saveNotificationToken = (token) => {
  return fetch('post', '/api/notifications/saveToken', { token });
};

const sendSubscriptions = (body) => {
  return fetch('post', '/api/subscriptions/save', body);
};

const deleteNotificationToken = (token) => {
  return fetch('delete', '/api/notifications/deleteToken', { token });
};

const viewNotifications = (body) => {
  return fetch('post', '/api/subscriptions/onViewNotification', body);
};

export default {
  login,
  register,
  test,
  savePoint,
  getInfo,
  deletePoint,
  movePoint,
  saveNotificationToken,
  deleteNotificationToken,
  sendSubscriptions,
  viewNotifications
};
