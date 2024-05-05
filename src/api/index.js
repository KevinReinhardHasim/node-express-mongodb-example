const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const transaction = require('./components/transactions/transaction-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  transaction(app);

  return app;
};
