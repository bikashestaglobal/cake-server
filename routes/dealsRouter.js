const express = require("express");
const dealsRouter = express.Router();
const dealsController = require("../controllers/dealsController");
const dealsValidationSchema = require("../apiValidationSchemas/dealsValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");
// create deals
dealsRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(dealsValidationSchema.createDeals),
  dealsController.createDeals
);

// update Deals
dealsRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(dealsValidationSchema.updateDeals),
  dealsController.updateDeals
);

// Get all Deals
dealsRouter.get(
  "/",
  joiSchemaValidation.validateQuery(dealsValidationSchema.getAllDeals),
  dealsController.getAllDeals
);

// Get Deals By ID
dealsRouter.get("/:id", dealsController.getDealsById);

// Delete Deals
dealsRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  dealsController.deleteDeals
);

module.exports = dealsRouter;
