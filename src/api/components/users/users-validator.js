const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirm_Password: joi.string().min(6).max(32).required().label('Password'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },


  updateNewPassword: {
  body: {
    password: joi.string().min(6).max(32).required().label('Password'),
    newPassword: joi.string().min(6).max(32).required().label('Password'),
    confirm_Password: joi.string().min(6).max(32).required().label('Password'),
  
  },
}
};