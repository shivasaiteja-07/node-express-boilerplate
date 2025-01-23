const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
    dateOfBirth: Joi.date().required().less('now').greater('1-1-1900').message('Please provide a valid date of birth'),
    
  }),
};


const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
    
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
    phoneNumber: Joi.string().optional().pattern(/^[0-9]{10}$/).message('Phone number must be 10 digits'),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
