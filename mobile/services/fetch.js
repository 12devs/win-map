import axios from 'axios';
import qs from 'qs';
import constants from '../constants'

const API_URL_PREFIX = constants.api.URL_PREFIX;
import { AsyncStorage } from 'react-native';

const fetch = (method, url, body) => {
  return AsyncStorage.getItem('windToken')
    .then(windToken => {
      let options;
      switch (method) {
        case 'get':
          options = {
            headers: {
              authorization: `Token ${windToken}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          };

          return axios.get(API_URL_PREFIX + url, options)
            .then(result => {
              return result.data;
            })
            .catch(err => {
              if (err.response.statusText === 'Unauthorized') {
                location.assign('/login');
              } else {
                return err.response.data;
              }
            });
        case 'post':

          return postPutDelete(url, 'POST', body);
        case 'delete':

          return postPutDelete(url, 'DELETE', body);
        default:

          return 'Unknown method';
      }
    })
};

const postPutDelete = (url, method, body) => {
  return AsyncStorage.getItem('windToken')
    .then(windToken => {
      const options = {
        method: method,
        url: API_URL_PREFIX + url,
        data: qs.stringify(body),
        headers: {
          authorization: `Token ${windToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      return axios(options)
        .then(result => {
          return result.data
        })
        .catch(err => {
          if (err.response.statusText === 'Unauthorized') {
            location.assign('/login')
          } else {
            return err.response.data;
          }
        });
    })
};

export {
  fetch,
};
