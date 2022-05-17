const Joi = require("joi");

// Customer Registration schema
module.exports.register = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().required(),
  mobile: Joi.string().trim().required(),
  password: Joi.string().min(6).trim().required(),
  otp: Joi.number().min(4).required(),
});

// Customer Login schema
module.exports.login = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).trim().required(),
  otp: Joi.number().min(4).required(),
});

// getAllCustomer schema
module.exports.getAllCustomer = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// Add Address schema
module.exports.addAddress = Joi.object({
  name: Joi.string().trim().min(3).required(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  email: Joi.string().email().trim().required(),
  alternateMobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  city: Joi.string().trim().required(),
  address: Joi.string().min(6).trim().required(),
  pincode: Joi.number().min(6).required(),
  companyName: Joi.string(),
});

// Customer updateProfile schema
module.exports.updateProfile = Joi.object({
  name: Joi.string().trim(),
  mobile: Joi.string().trim().min(10),
  password: Joi.string().min(6).trim(),
  sameAddress: Joi.boolean(),
  billingAddress: {
    city: Joi.string().required(),
    name: Joi.string().required(),
    pincode: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": `"Mobile" must contain value`,
        "string.pattern.base": `"Mobile" must be a valid Number`,
        "any.required": `"Mobile" is a required field`,
      }),
    companyName: Joi.string(),
    additionalInfo: Joi.string(),
  },
  shippingAddress: {
    city: Joi.string().required(),
    name: Joi.string().required(),
    pincode: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": `"Mobile" must contain value`,
        "string.pattern.base": `"Mobile" must be a valid Number`,
        "any.required": `"Mobile" is a required field`,
      }),
    companyName: Joi.string(),
  },
});
