const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const productValidationSchema = require("../apiValidationSchemas/productValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");
// create product
productRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(productValidationSchema.createProduct),
  productController.createProduct
);

// update product
productRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(productValidationSchema.updateProduct),
  productController.updateProduct
);

// Get all product
productRouter.get(
  "/",
  joiSchemaValidation.validateQuery(productValidationSchema.getAllProduct),
  productController.getAllProduct
);

// Get all product
productRouter.post(
  "/filter",
  joiSchemaValidation.validateBody(productValidationSchema.filterProducts),
  productController.filterProducts
);

// SearchProduct
productRouter.get(
  "/search",
  joiSchemaValidation.validateBody(productValidationSchema.searchProducts),
  productController.searchProducts
);

// getProductsByCategorySlug
productRouter.get(
  "/by-category-slug/:slug",
  joiSchemaValidation.validateQuery(
    productValidationSchema.getProductsByCategorySlug
  ),
  productController.getProductsByCategorySlug
);

// getProductsByParCategorySlug
productRouter.get(
  "/by-par-category-slug/:slug",
  joiSchemaValidation.validateQuery(
    productValidationSchema.getProductsByCategorySlug
  ),
  productController.getProductsByParCategorySlug
);

// Get Category By ID
productRouter.get("/:id", productController.getProductById);

// Get Category By ID
productRouter.get(
  "/by-slug/:slug",
  joiSchemaValidation.validateQuery(productValidationSchema.getProductBySlug),
  productController.getProductBySlug
);

// Get Category By ID
productRouter.get(
  "/by/category",
  joiSchemaValidation.validateQuery(productValidationSchema.getAllProduct),
  productController.getProductByCategory
);

// Delete Category
productRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  productController.deleteProduct
);

module.exports = productRouter;
