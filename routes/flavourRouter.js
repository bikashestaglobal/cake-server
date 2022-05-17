const express = require("express");
const flavourRouter = express.Router();
const flavourController = require("../controllers/flavourController");
const flavourValidationSchema = require("../apiValidationSchemas/flavourValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createFlavour Flavour
flavourRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(flavourValidationSchema.createFlavour),
  flavourController.createFlavour
);

// update Flavour
flavourRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(flavourValidationSchema.updateFlavour),
  flavourController.updateFlavour
);

// Get all Flavours
flavourRouter.get(
  "/",
  joiSchemaValidation.validateQuery(flavourValidationSchema.getAllFlavour),
  flavourController.getAllFlavour
);

// getFlavoursWithProductsByCategory
flavourRouter.get(
  "/withProductsByCategory",
  joiSchemaValidation.validateQuery(
    flavourValidationSchema.getFlavoursWithProductsByCategory
  ),
  flavourController.getFlavoursWithProductsByCategory
);

// Get Flavour by ID
flavourRouter.get("/:id", flavourController.getFlavourById);

// Get Flavour by ID
flavourRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  flavourController.deleteFlavour
);
module.exports = flavourRouter;
