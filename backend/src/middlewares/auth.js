const jwt = require('express-jwt');
const config = require('config');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = jwt({
  secret: config.auth.secret,
  // userProperty: 'payload',
  getToken: getTokenFromHeaders,
  credentialsRequired: true,
});

module.exports = auth;
