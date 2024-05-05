const transactionsRepository = require('./transaction-repository');
const { hashPassword } = require('../../../utils/password');
const { password } = require('../../../models/transaction-schema');

/**
 * Get list of transactions
 * @returns {Array}
 */
async function getTransactions() {
  const transactions = await transactionsRepository.getTransactions();
  console.log('getting transaction');
  let results = [];
  for (let i = 0; i < transactions.length; i += 1) {
    const transaction = transactions[i];

    results.push({
      userId: transaction.userId,
      notice: transaction.notice,
      amount: transaction.amount,
    });
  }
  return results;
}

/**
 * Get transaction detail
 * @param {string} id - transaction ID
 * @returns {Object}
 */
async function getTransaction(id) {
  const transaction = await transactionsRepository.getTransaction(id);

  // transaction not found
  if (!transaction) {
    return null;
  }

  return {
    userId: transaction.userId,
    notice: transaction.notice,
    amount: transaction.amount,
  };
}

/**
 * Create new transaction
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createTransaction(userId, notice, amount) {
  // Hash password
  try {
    await transactionsRepository.createTransaction(userId, notice, amount);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing transaction
 * @param {string} id - transaction ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateTransaction(id, notice, amount) {
  const transaction = await transactionsRepository.getTransaction(id);

  // transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionsRepository.updateTransaction(id, notice, amount);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete transaction
 * @param {string} id - transaction ID
 * @returns {boolean}
 */
async function deleteTransaction(id) {
  const transaction = await transactionsRepository.getTransaction(id);

  // transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionsRepository.deleteTransaction(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
