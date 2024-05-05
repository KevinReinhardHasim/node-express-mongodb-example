const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const transactionControllers = require('./transaction-controller');

const transactionRequest = require('./transaction-request');

const route = express.Router();

module.exports = (app) => {
  app.use('/transactions', route);

  // Get list of transaction
  route.get('/', authenticationMiddleware, function (req, res) {
    return transactionControllers.getTransactions(req, res);
  });

  // Create Transaction
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(transactionRequest.createTransaction),
    transactionControllers.createTransaction
  );

  // Get Transaction detail
  route.get(
    '/:id',
    authenticationMiddleware,
    transactionControllers.getTransaction
  );

  // Update Transaction
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(transactionRequest.updateTransaction),
    transactionControllers.updateTransaction
  );

  // Delete Transaction
  route.delete(
    '/:id',
    authenticationMiddleware,
    transactionControllers.deleteTransaction
  );
};
