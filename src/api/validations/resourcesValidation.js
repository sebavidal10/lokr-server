const Joi = require('joi');

module.exports = {
  createResource: {
    body: Joi.object({
      name: Joi.string().required(),
      url: Joi.string().required(),
    }),
  },
};
