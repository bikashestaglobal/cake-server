const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const categoryValidationSchema = require("../apiValidationSchemas/categoryValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");
// create category
categoryRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(categoryValidationSchema.createCategory),
  categoryController.createCategory
);

// create category
categoryRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(categoryValidationSchema.updateCategory),
  categoryController.updateCategory
);

// Get all category
categoryRouter.get(
  "/",
  joiSchemaValidation.validateQuery(categoryValidationSchema.getAllCategory),
  categoryController.getAllCategory
);

// Get Category By Parent Slug
categoryRouter.get(
  "/get/byParentCategorySlug/:slug",
  categoryController.getCategoryByParentSlug
);

// Get Category By ID
categoryRouter.get("/:id", categoryController.getCategoryById);

// Get Category By ID
categoryRouter.get("/bySlug/:slug", categoryController.getCategoryBySlug);

// Get Category By Parent cat ID
categoryRouter.post(
  "/byParentCategory",
  categoryController.getCategoryByParentCatId
);

// Delete Category
categoryRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
