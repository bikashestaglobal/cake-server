const express = require("express");
const shippingMethodRouter = express.Router();
const shippingMethodController = require("../controllers/shippingMethodController");
const shippingMethodValidationSchema = require("../apiValidationSchemas/shippingMethodValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// create shippingMethod
shippingMethodRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    shippingMethodValidationSchema.createShippingMethod
  ),
  shippingMethodController.createShippingMethod
);

// update shippingMethod
shippingMethodRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    shippingMethodValidationSchema.updateShippingMethod
  ),
  shippingMethodController.updateShippingMethod
);

// Get all coupons
shippingMethodRouter.get(
  "/",
  joiSchemaValidation.validateQuery(
    shippingMethodValidationSchema.getAllShippingMethod
  ),
  shippingMethodController.getAllShippingMethod
);

// Get shippingMethodById
shippingMethodRouter.get(
  "/:id",
  shippingMethodController.getShippingMethodById
);

// Get shippingMethod by ID
shippingMethodRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  shippingMethodController.deleteShippingMethod
);

module.exports = shippingMethodRouter;
