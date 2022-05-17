const Joi = require("joi");

// createShape Validation Schema
module.exports.createShape = Joi.object({
  name: Joi.string().required().trim(),
});

// getAllShape Validation Schema
module.exports.getAllShape = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// getShapesWithProductsByCategory Validation Schema
module.exports.getShapesWithProductsByCategory = Joi.object({
  skip: Joi.string(),
  slug: Joi.string(),
  limit: Joi.string(),
});

// updateShape Validation Schema
module.exports.updateShape = Joi.object({
  name: Joi.string().trim(),
  status: Joi.string().trim(),
});
