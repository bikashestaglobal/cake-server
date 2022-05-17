const Joi = require("joi");

// Create or Update Setting validation Schema
module.exports.createUpdateSetting = Joi.object({
  minimumOrderAmount: Joi.number(),
  cashback: Joi.number(),
  nextToSlider: Joi.object(),
  bestSaleBanner: Joi.object(),
  offerBanner: Joi.array(),
  categoryPageBanner: Joi.object(),
  slider: Joi.array(),
});
