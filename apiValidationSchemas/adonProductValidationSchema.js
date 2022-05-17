const Joi = require("joi");

// Create Product Validation Schema
module.exports.createProduct = Joi.object({
  name: Joi.string().required().trim(),
  sellingPrice: Joi.number().required(),
  parentCategories: Joi.array(),
  categories: Joi.array(),
  image: Joi.string(),
});

// Get All Product Validation Schema
module.exports.getAllProduct = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Update Product Validation Schema
module.exports.updateProduct = Joi.object({
  name: Joi.string().trim(),
  sellingPrice: Joi.number(),
  parentCategories: Joi.array(),
  categories: Joi.array(),
  image: Joi.string(),
});
