const Joi = require("joi");

// Customer createOrder schema
module.exports.createOrder = Joi.object({
  // customerId: Joi.string().trim().required(),
  products: Joi.array().required(),
  adonProducts: Joi.array().required(),
  billingAddress: {
    city: Joi.string().required(),
    name: Joi.string().required(),
    pincode: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    companyName: Joi.string(),
    additionalInfo: Joi.string(),
  },
  shippingAddress: {
    city: Joi.string().required(),
    name: Joi.string().required(),
    pincode: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    companyName: Joi.string(),
    additionalInfo: Joi.string(),
  },
  // couponCode: Joi.string(),
  discountWithCoupon: Joi.number(),
  coupon: Joi.object(),
  subtotal: Joi.number().required(),
  adonTotalAmount: Joi.number(),
  totalAmount: Joi.number().required(),
  paymentMethod: Joi.string().required(),
  shippingMethod: {
    method: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  },
  paymentId: Joi.string(),
});

// Customer createOrder schema
module.exports.updateOrder = Joi.object({
  cancelledBy: Joi.string(),
  cancelMessage: Joi.string(),
  orderStatus: Joi.string(),
});

// getMyOrders Validation Schema
module.exports.getMyOrders = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

// getAllOrder Validation Schema
module.exports.getAllOrder = Joi.object({
  skip: Joi.string(),
  orderStatus: Joi.string(),
  limit: Joi.string(),
});
