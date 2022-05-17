const Joi = require("joi");

// createReview Validation Schema
module.exports.createReview = Joi.object({
  product: Joi.string().required().trim(),
  rating: Joi.number(),
  message: Joi.string(),
});

// getAllReview Validation Schema
module.exports.getAllReview = Joi.object({
  skip: Joi.string(),
  product: Joi.string(),
  customer: Joi.string(),
  limit: Joi.string(),
});

// getShapesWithProductsByCategory Validation Schema
// module.exports.getShapesWithProductsByCategory = Joi.object({
//   skip: Joi.string(),
//   slug: Joi.string(),
//   limit: Joi.string(),
// });

// updateReview Validation Schema
module.exports.updateReview = Joi.object({
  name: Joi.string().trim(),
  status: Joi.string().trim(),
});
