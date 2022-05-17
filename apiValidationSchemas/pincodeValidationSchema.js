const Joi = require("joi");

// Create Pincode Validation Schema
module.exports.createPincode = Joi.object({
  pincode: Joi.number().required().min(6),
  state: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
});

// Get All Pincode Validation Schema
module.exports.getAllPincode = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Update Pincode Validation Schema
module.exports.updatePincode = Joi.object({
  pincode: Joi.number().min(6),
  state: Joi.string().trim(),
  city: Joi.string().trim(),
  status: Joi.string().trim(),
});
