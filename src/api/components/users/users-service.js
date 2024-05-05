const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const { password } = require('../../../models/users-schema');
const { updateNewPassword } = require('./users-validator');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers(page, size, search, sort) {
  const users = await usersRepository.getUsers();

  let results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  if (search != null) {
    let _search = search.split(':');

    if (_search[0] == 'email') {
      results = results.filter((item) => item.email.includes(_search[1]));
    } else if (_search[0] == 'name') {
      results = results.filter((item) => item.name.includes(_search[1]));
    }
  }

  if (sort != null) {
    let _sort = sort.split(':');
    if (_sort[0] == 'email') {
      if (_sort[1] == 'desc') {
        results = results.sort((a, b) => {
          if (a.email < b.email) return 1;
          if (a.email > b.email) return -1;
          return 0;
        });
      } else if (_sort[1] == 'asc') {
        results = results.sort((a, b) => {
          if (a.email > b.email) return 1;
          if (a.email < b.email) return -1;
          return 0;
        });
      }
    } else if (_sort[0] == 'name') {
      if (_sort[1] == 'desc') {
        results = results.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      } else if (_sort[1] == 'asc') {
        results = results.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
    }
  }

  if (page == null) page = 1;
  if (size == null) size = 10;

  let count = results.length;
  let total_page = Math.ceil(count / size);

  let has_next = (has_prev = false);

  if (page != 1) has_prev = true;
  if (page < total_page) has_next = true;

  let potential = page * size;

  data = [];
  for (let i = 0; i < count && i < potential; i++) {
    let curr_page = Math.floor(i / size);

    if (curr_page + 1 == page) data.push(results[i]);
  }

  response = {
    page_number: parseInt(page),
    page_size: parseInt(size),
    count: count,
    total_pages: total_page,
    has_previous_page: has_prev,
    has_next_page: has_next,
    data: data,
  };

  return response;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Get user detail
 * @param {string} email - check email
 * @returns {promise}
 */
async function checkEmail(email) {
  return await usersRepository.checkEmail(email);
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} password_Baru - pass baru
 * @returns {boolean}
 */
async function UpdateNewPassword(id, Password) {
  const user = await usersRepository.getUser(id);
  const hashNewPassword = await hashPassword(Password);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.UpdateNewPassword(id, hashNewPassword);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmail,
  UpdateNewPassword,
};
