import axios from 'axios';

var qs = require('qs');

const fetch = (method, url, body) => {
  let options;
  switch (method) {
    case 'get':
      options = {
        headers: {
          authorization: `Token ${localStorage.windToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      return axios.get(url, options)
        .then(result => {
          return result.data
        })
        .catch(err => {
          if (err.response.statusText === 'Unauthorized') {
            location.assign('/login')
          } else {
            return err.response.data
          }
        });
    case 'post' || 'delete':

      return postPutDelete(url, 'POST', body);
    case 'delete':

      return postPutDelete(url, 'DELETE', body);
    default:

      return 'Unknown method'
  }
};

const postPutDelete = (url, method, body) => {

  const options = {
    method: method,
    url,
    data: qs.stringify(body),
    headers: {
      authorization: `Token ${localStorage.windToken}`,
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
        return err.response.data
      }
    });
}

export {
  fetch,
};
