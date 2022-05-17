const express = require("express");
const Router = express.Router();
const shapeController = require("../controllers/shapeController");
const shapeValidationSchema = require("../apiValidationSchemas/shapeValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createShape Flavour
Router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(shapeValidationSchema.createShape),
  shapeController.createShape
);

// updateShape
Router.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(shapeValidationSchema.updateShape),
  shapeController.updateShape
);

// getAllShape
Router.get(
  "/",
  joiSchemaValidation.validateQuery(shapeValidationSchema.getAllShape),
  shapeController.getAllShape
);

// getShapeById
Router.get("/:id", shapeController.getShapeById);

// deleteShape
Router.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  shapeController.deleteShape
);
module.exports = Router;
