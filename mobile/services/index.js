import { fetch } from './fetch';
import axios from 'axios';

const login = (body) => {
  return fetch('post', '/publicRouts/login', body);
};

const changePassword = (body) => {
  return fetch('post', '/publicRouts/changePassword', body);
};

const register = (body) => {
  return fetch('post', '/publicRouts/register', body);
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
const search = (place) => {
  return axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
};


export default {
  login,
  changePassword,
  register,
  test,
  savePoint,
  getInfo,
  deletePoint,
  movePoint,
  saveNotificationToken,
  deleteNotificationToken,
  sendSubscriptions,
  viewNotifications,
  search
};
