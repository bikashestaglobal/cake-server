const Joi = require("joi");

// Create Deal Validation Schema
module.exports.createDeals = Joi.object({
  name: Joi.string().required().trim(),
  discountPercentage: Joi.number().required(),
  validity: Joi.date().required(),
  products: Joi.array().required(),
});

// Get All Deal Validation Schema
module.exports.getAllDeals = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Update Deal Validation Schema
module.exports.updateDeals = Joi.object({
  name: Joi.string().trim(),
  discountPercentage: Joi.number(),
  validity: Joi.date(),
  products: Joi.array(),
});
