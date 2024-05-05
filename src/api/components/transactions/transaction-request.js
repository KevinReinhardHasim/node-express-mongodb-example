const joi = require('joi');
const { createTransaction } = require('./transaction-repository');

module.exports = {
  createTransaction: {
    body: {
      userId: joi.string().required().label('userId'),
      notice: joi.string().required().label('notice'),
      amount: joi.number().required().label('amount'),
    },
  },

  updateTransaction: {
    body: {
      userId: joi.string().required().label('userId'),
      notice: joi.string().required().label('notice'),
      amount: joi.number().required().label('amount'),
    },
  },
};
