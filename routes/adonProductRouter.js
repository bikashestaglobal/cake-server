const express = require("express");
const productRouter = express.Router();
const adonPoductController = require("../controllers/adonPoductController");
const adonProductValidationSchema = require("../apiValidationSchemas/adonProductValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");
// create product
productRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(adonProductValidationSchema.createProduct),
  adonPoductController.createProduct
);

// update product
productRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(adonProductValidationSchema.updateProduct),
  adonPoductController.updateProduct
);

// Get all product
productRouter.get(
  "/",
  joiSchemaValidation.validateQuery(adonProductValidationSchema.getAllProduct),
  adonPoductController.getAllProduct
);

// Get Category By ID
productRouter.get("/:id", adonPoductController.getProductById);

// Delete Category
productRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  adonPoductController.deleteProduct
);

module.exports = productRouter;
