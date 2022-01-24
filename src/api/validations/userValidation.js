const Joi = require('joi');
const User = require('../models/userModel');

module.exports = {
  // GET /users
  listUsers: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      email: Joi.string(),
      role: Joi.string().valid(User.roles),
    }),
  },

  // POST /users
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      role: Joi.string().valid(User.roles),
    }),
  },

  // PUT /users/:userId
  replaceUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      role: Joi.string().valid(User.roles),
    }),
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  // PATCH /users/:userId
  updateUser: {
    body: Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      role: Joi.string().valid(User.roles),
    }),
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
