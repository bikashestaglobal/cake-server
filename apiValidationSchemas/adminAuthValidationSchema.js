const Joi = require("joi");

// Admin Registration schema
module.exports.register = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).trim().required(),
});

// Admin Login schema
module.exports.login = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).trim().required(),
});
