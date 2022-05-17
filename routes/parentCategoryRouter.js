const express = require("express");
const categoryRouter = express.Router();
const parentCategoryController = require("../controllers/parentCategoryController");
const parentCatValidationSchema = require("../apiValidationSchemas/parentCatValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// Create Category
categoryRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(parentCatValidationSchema.createCategory),
  parentCategoryController.createCategory
);

// Update Category
categoryRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(parentCatValidationSchema.updateCategory),
  parentCategoryController.updateCategory
);

// Get All Category
categoryRouter.get(
  "/",
  joiSchemaValidation.validateQuery(parentCatValidationSchema.getAllCategory),
  parentCategoryController.getAllCategory
);

// Get Category By ID
categoryRouter.get("/:id", parentCategoryController.getCategoryById);

// Get Category By ID
categoryRouter.get("/bySlug/:slug", parentCategoryController.getCategoryBySlug);

// Delete Category
categoryRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  parentCategoryController.deleteCategory
);

module.exports = categoryRouter;
