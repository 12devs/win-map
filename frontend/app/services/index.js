import { fetch } from './fetch';

const login = (login, password) => {
  return fetch('post', '/publicRouts/login', { login, password });
};

const register = (login, password) => {
  return fetch('post', '/publicRouts/register', { login, password });
};

const test = () => {
  return fetch('get', '/api/test');
};

export default {
  login,
  register,
  test
};
