const { ObjectId } = require('mongodb');

const transactionSchema = {
  userId: String,
  _id: ObjectId,
  notice: String,
  amount: Number,
};

module.exports = transactionSchema;
