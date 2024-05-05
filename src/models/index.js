const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const transactionSchema = require('./transaction-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Transaction = mongoose.model(
  'transaction2',
  mongoose.Schema(transactionSchema)
);

module.exports = {
  mongoose,
  User,
  Transaction,
};
