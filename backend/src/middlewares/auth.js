const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = jwt({
  secret: 'secret',
  // userProperty: 'payload',
  getToken: getTokenFromHeaders,
  credentialsRequired: true,
});

module.exports = auth;
