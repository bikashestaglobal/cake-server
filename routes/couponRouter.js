const express = require("express");
const couponRouter = express.Router();
const couponController = require("../controllers/couponController");
const couponValidationSchema = require("../apiValidationSchemas/couponValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// create coupon
couponRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(couponValidationSchema.createCoupon),
  couponController.createCoupon
);

// update coupon
couponRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(couponValidationSchema.updateCoupon),
  couponController.updateCoupon
);

// Get all coupons
couponRouter.get(
  "/",
  joiSchemaValidation.validateQuery(couponValidationSchema.getAllCoupon),
  couponController.getAllCoupon
);

// verifyCoupon
couponRouter.get(
  "/verify/:code",
  jwtValidation.validateCustomerToken,
  couponController.verifyCoupon
);

// Get coupon by ID
couponRouter.get("/:id", couponController.getCouponById);

// Get coupon by ID
couponRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  couponController.deleteCoupon
);
module.exports = couponRouter;
