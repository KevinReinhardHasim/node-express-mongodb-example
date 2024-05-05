const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.

  const date = new Date();
  const timedout = new Date(user.timedout);

  if (timedout > date) {
    return 'timedout';
  }

  if (user && passwordChecked) {
    user.attempt = 0;
    await user.save();
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  }

  let time_timedout = new Date(date.getTime() + 30 * 60000);
  let timedout_date = time_timedout.toISOString();

  user.attempt = user.attempt + 1;
  if (user.attempt == 5) {
    user.timedout = timedout_date;
    await user.save();
    return 'timedout';
  }
  await user.save();

  return null;
}

// Function to log failed login attempt
async function logFailedLoginAttempt(username) {
  try {
    const attempt = new LoginAttempt({ username });
    await attempt.save();

    // Check if the user has reached the maximum failed attempts
  } catch (err) {
    console.error('Failed to log login attempt:', err);
  }
}

module.exports = {
  checkLoginCredentials,
};
