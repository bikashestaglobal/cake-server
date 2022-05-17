const Joi = require("joi");

// Create ShippingMethod Validation Schema
module.exports.createShippingMethod = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().required(),
  shippingTimes: Joi.array(),
});

// Get All ShippingMethod Validation Schema
module.exports.getAllShippingMethod = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Update ShippingMethod Validation Schema
module.exports.updateShippingMethod = Joi.object({
  name: Joi.string().trim(),
  amount: Joi.number().min(0),
  shippingTimes: Joi.array(),
});
