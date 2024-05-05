const { Transaction } = require('../../../models');
const { ObjectId } = require('mongodb');
/**
 * Get a list of users
 * @returns {Promise}
 */
async function getTransactions() {
  return Transaction.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getTransaction(id) {
  return Transaction.findById(id);
}

/**
 * Create new
 * @param {ObjectId} _id - _id
 * @param {string} userId - userId
 * @param {string} notice - notice
 * @param {number} amount - Hashed password
 * @returns {Promise}
 */
async function createTransaction(userId, notice, amount) {
  const objectId = new ObjectId();
  return Transaction.create({
    _id: objectId,
    userId: userId,
    notice: notice,
    amount: amount,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateTransaction(id, notice, amount) {
  return Transaction.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        notice: notice,
        amount: amount,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteTransaction(id) {
  return Transaction.deleteOne({ _id: id });
}

/**
 * Get user detail
 * @param {string} email - check email
 * @returns {promise}
 */
module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
