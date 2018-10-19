import { fetch } from './fetch';

const login = (login, password) => {
  return fetch('post', '/publicRouts/login', { login, password });
};

const register = (login, password) => {
  return fetch('post', '/publicRouts/register', { login, password });
};

const test = () => {
  return fetch('post', '/api/test', {data: 'dfdfdfdfdfdf'});
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
  return fetch('post','/api/notifications/saveToken', { token });
}

export default {
  login,
  register,
  test,
  savePoint,
  getInfo,
  deletePoint,
  movePoint,
  saveNotificationToken,
};
