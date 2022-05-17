const express = require("express");
const Router = express.Router();
const pincodeController = require("../controllers/pincodeController");
const pincodeValidationSchema = require("../apiValidationSchemas/pincodeValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createPincode Flavour
Router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(pincodeValidationSchema.createPincode),
  pincodeController.createPincode
);

// updatePincode
Router.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(pincodeValidationSchema.updatePincode),
  pincodeController.updatePincode
);

// getAllPincode
Router.get(
  "/",
  joiSchemaValidation.validateQuery(pincodeValidationSchema.getAllPincode),
  pincodeController.getAllPincode
);

// getPincodeById
Router.get("/:id", pincodeController.getPincodeById);

// deletePincode
Router.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  pincodeController.deletePincode
);
module.exports = Router;
