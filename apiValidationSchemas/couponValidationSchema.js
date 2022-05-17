const Joi = require("joi");

// Create Coupon Validation Schema
module.exports.createCoupon = Joi.object({
  code: Joi.string().required().trim(),
  applyFor: Joi.string().trim().required(),
  discountType: Joi.string().trim().required(),
  discount: Joi.number().required(),
  usesTimes: Joi.number().required(),
  description: Joi.string().trim(),
  minimumAmount: Joi.number().required(),
  validity: Joi.string().required(),
  startDate: Joi.string().required(),
});

// Get All Coupon Validation Schema
module.exports.getAllCoupon = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.string(),
});

// Update Coupon Validation Schema
module.exports.updateCoupon = Joi.object({
  code: Joi.string().trim(),
  applyFor: Joi.string().trim(),
  discountType: Joi.string().trim(),
  discount: Joi.number(),
  usesTimes: Joi.number(),
  description: Joi.string().trim(),
  minimumAmount: Joi.number(),
  validity: Joi.string(),
  startDate: Joi.string(),
});
