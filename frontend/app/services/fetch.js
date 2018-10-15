import axios from 'axios';

const options = () => {
  return {
    headers: {
      authorization: `Token ${localStorage.windToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
};

const fetch = (method, url, body) => {
  switch (method) {
    case 'get':
      return axios.get(url, options())
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
    case 'post':
      return axios.post(url, body)
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
    default:
      return 'Unknown method'
  }
};

export {
  fetch,
};
