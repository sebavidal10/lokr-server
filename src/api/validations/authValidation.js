const Joi = require('joi');

module.exports = {
  // POST /auth/register
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
    }),
  },

  // POST /auth/login
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    }),
  },

  // POST /auth/refresh-token
  refresh: {
    body: Joi.object({
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    }),
  },

  // POST /auth/send-password-reset
  sendPasswordReset: {
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  },

  // POST /auth/reset-password
  passwordReset: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      resetToken: Joi.string().required(),
    }),
  },
};
