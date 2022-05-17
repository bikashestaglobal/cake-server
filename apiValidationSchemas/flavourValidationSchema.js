const Joi = require("joi");

// Create Flavour Validation Schema
module.exports.createFlavour = Joi.object({
  name: Joi.string().required().trim(),
});

// Get All Flavour Validation Schema
module.exports.getAllFlavour = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// getFlavoursWithProductsByCategory Validation Schema
module.exports.getFlavoursWithProductsByCategory = Joi.object({
  skip: Joi.string(),
  slug: Joi.string(),
  limit: Joi.string(),
  parCatSlug: Joi.string(),
  catSlug: Joi.string(),
});

// Update Flavour Validation Schema
module.exports.updateFlavour = Joi.object({
  name: Joi.string().trim(),
  status: Joi.string().trim(),
});
