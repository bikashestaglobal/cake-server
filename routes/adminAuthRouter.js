const express = require("express");
const adminAuthController = require("../controllers/adminAuthController");
const adminAuthValidationSchema = require("../apiValidationSchemas/adminAuthValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const adminAuthRouter = express.Router();
// Registration Routes
adminAuthRouter.post(
  "/register",
  joiSchemaValidation.validateBody(adminAuthValidationSchema.register),
  adminAuthController.register
);

// Login Routes
adminAuthRouter.post(
  "/login",
  joiSchemaValidation.validateBody(adminAuthValidationSchema.login),
  adminAuthController.login
);

module.exports = adminAuthRouter;
