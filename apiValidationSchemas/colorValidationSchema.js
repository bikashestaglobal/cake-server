const Joi = require("joi");

// Create Color Validation Schema
module.exports.createColor = Joi.object({
  name: Joi.string().required().trim(),
});

// Get All Color Validation Schema
module.exports.getAllColor = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Get All Color Validation Schema
module.exports.getColorsWithProductsByCategory = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  parCatSlug: Joi.string(),
  catSlug: Joi.string(),
});

// Update Color Validation Schema
module.exports.updateColor = Joi.object({
  name: Joi.string().trim(),
  status: Joi.string().trim(),
});
