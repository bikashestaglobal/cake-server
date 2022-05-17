const express = require("express");
const settingRouter = express.Router();
const settingController = require("../controllers/settingController");
const settingValidationSchema = require("../apiValidationSchemas/settingValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// create update setting
settingRouter.put(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(settingValidationSchema.createUpdateSetting),
  settingController.createUpdateSetting
);
// getAllSetting
settingRouter.get(
  "/",
  // jwtValidation.validateAdminToken,
  settingController.getAllSetting
);

module.exports = settingRouter;
