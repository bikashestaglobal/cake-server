const Joi = require("joi");

// createTransaction Validation Schema
module.exports.createTransaction = Joi.object({
  amount: Joi.number().required(),
  orderId: Joi.string().required(),
});
