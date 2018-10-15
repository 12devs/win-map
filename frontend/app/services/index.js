import axios from 'axios';

const options = () => {
  return {
    headers: {
      authorization: `Token ${localStorage.windToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
}

const login = (login, password) => {
  return axios.post('/publicRouts/login', { login, password })
    .then(result => {
      return result.data
    });
};

const register = (login, password) => {
  return axios.post('/publicRouts/register', { login, password })
    .then(result => {
      return result.data
    });
};

const test = () => {
  return axios.get('/api/test', options())
    .then(result => {
      return result.data
    });
};

export default {
  login,
  register,
  test
};
