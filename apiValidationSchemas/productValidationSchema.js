const Joi = require("joi");

// Create Product Validation Schema
module.exports.createProduct = Joi.object({
  name: Joi.string().required().trim(),
  slug: Joi.string().required().trim(),
  skus: Joi.array().required().items(Joi.object().required()),
  flavour: Joi.string().required(),
  shape: Joi.string().required(),
  color: Joi.string().required(),
  isEggCake: Joi.boolean().required(),
  isPhotoCake: Joi.boolean().required(),
  parentCategories: Joi.array().items(Joi.string().required()),
  categories: Joi.array().items(Joi.string().required()),
  images: Joi.array().items(Joi.object().required()),
  description: Joi.string().trim(),
});

// Get All Product Validation Schema
module.exports.getAllProduct = Joi.object({
  skip: Joi.string(),
  categoryId: Joi.string(),
  limit: Joi.string(),
  parCatSlug: Joi.string(),
  catSlug: Joi.string(),
  minPrice: Joi.string(),
  maxPrice: Joi.string(),
  flavour: Joi.string(),
  color: Joi.string(),
  shape: Joi.string(),
});

// filterProducts Validation Schema
module.exports.filterProducts = Joi.object({
  colors: Joi.array(),
  flavours: Joi.array(),
  skip: Joi.number(),
  limit: Joi.number(),
  catId: Joi.string(),
  parCatId: Joi.string(),
});

// searchProducts Validation Schema
module.exports.searchProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  category: Joi.string(),
  query: Joi.string(),
});

// Get All Product Validation Schema
module.exports.getProductsByCategorySlug = Joi.object({
  skip: Joi.string(),
  slug: Joi.string(),
  limit: Joi.string(),
});

// Get All Product Validation Schema
module.exports.getProductBySlug = Joi.object({
  slug: Joi.string(),
});

// Update Product Validation Schema
module.exports.updateProduct = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  skus: Joi.array(),
  flavour: Joi.string(),
  shape: Joi.string(),
  size: Joi.string(),
  reviews: Joi.array(),
  isEggCake: Joi.boolean(),
  isPhotoCake: Joi.boolean(),
  parentCategories: Joi.array(),
  categories: Joi.array(),
  images: Joi.array(),
  description: Joi.string().trim(),
});
