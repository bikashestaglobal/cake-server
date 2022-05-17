const express = require("express");
const Router = express.Router();
const reviewController = require("../controllers/reviewController");
const reviewValidationSchema = require("../apiValidationSchemas/reviewValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createReview Flavour
Router.post(
  "/",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(reviewValidationSchema.createReview),
  reviewController.createReview
);

// updateReview
Router.put(
  "/:id",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(reviewValidationSchema.updateReview),
  reviewController.updateReview
);

// getAllReview
Router.get(
  "/",
  joiSchemaValidation.validateQuery(reviewValidationSchema.getAllReview),
  reviewController.getAllReview
);

// getReviewById
Router.get("/:id", reviewController.getReviewById);

// deleteReview
Router.delete(
  "/:id",
  jwtValidation.validateCustomerToken,
  reviewController.deleteReview
);
module.exports = Router;
