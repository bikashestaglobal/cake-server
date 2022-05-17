const express = require("express");
const colorRouter = express.Router();
const colorController = require("../controllers/colorController");
const colorValidationSchema = require("../apiValidationSchemas/colorValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createColor Flavour
colorRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(colorValidationSchema.createColor),
  colorController.createColor
);

// updateColor
colorRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(colorValidationSchema.updateColor),
  colorController.updateColor
);

// GetAllColor
colorRouter.get(
  "/",
  joiSchemaValidation.validateQuery(colorValidationSchema.getAllColor),
  colorController.getAllColor
);

// getColorsWithProductsByCategory
colorRouter.get(
  "/withProductsByCategory",
  joiSchemaValidation.validateQuery(
    colorValidationSchema.getColorsWithProductsByCategory
  ),
  colorController.getColorsWithProductsByCategory
);

// getColorByID
colorRouter.get("/:id", colorController.getColorById);

// deleteColor
colorRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  colorController.deleteColor
);

module.exports = colorRouter;
