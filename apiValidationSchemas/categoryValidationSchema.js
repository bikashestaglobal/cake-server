const Joi = require("joi");

// Create Category Validation Schema
module.exports.createCategory = Joi.object({
  name: Joi.string().required().trim(),
  slug: Joi.string().required().trim(),
  description: Joi.string().trim(),
  image: Joi.string().trim(),
  parentCategories: Joi.array(),
  // tags: Joi.array(),
});

// Get All Category Validation Schema
module.exports.getAllCategory = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Update Category Validation Schema
module.exports.updateCategory = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  description: Joi.string().trim(),
  image: Joi.string().trim(),
  parentCategories: Joi.array(),
  status: Joi.boolean(),
  // tags: Joi.array(),
});
