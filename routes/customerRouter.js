const express = require("express");
const customerController = require("../controllers/customerController");
const customerValidationSchema = require("../apiValidationSchemas/customerValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const {
  validateCustomerToken,
  validateAdminToken,
} = require("../middlewares/jwtValidation");

const walletValidationSchema = require("../apiValidationSchemas/walletValidationSchema");

const customerRouter = express.Router();
// Registration Routes
customerRouter.post(
  "/register",
  joiSchemaValidation.validateBody(customerValidationSchema.register),
  customerController.register
);
// verifyAccount Routes
customerRouter.post("/verify", customerController.verifyAccount);

// Login Routes
customerRouter.post(
  "/login",
  joiSchemaValidation.validateBody(customerValidationSchema.login),
  customerController.login
);

// Login Routes
customerRouter.post(
  "/walletTransaction",
  validateCustomerToken,
  joiSchemaValidation.validateBody(walletValidationSchema.createTransaction),
  customerController.createWalletTransaction
);

// getAllCustomer
customerRouter.get(
  "/",
  validateAdminToken,
  joiSchemaValidation.validateQuery(customerValidationSchema.getAllCustomer),
  customerController.getAllCustomer
);
// deleteCustomer
customerRouter.delete(
  "/:id",
  validateAdminToken,
  customerController.deleteCustomer
);

// Profile Routes
customerRouter.get(
  "/profile",
  validateCustomerToken,
  customerController.getProfile
);

// Update Profile Routes
customerRouter.put(
  "/profile",
  validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.updateProfile),
  customerController.updateProfile
);
// Add Address Routes
customerRouter.post(
  "/address",
  validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.addAddress),
  customerController.addAddress
);

// Update Address Routes
customerRouter.put(
  "/address/:id",
  validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.addAddress),
  customerController.updateAddress
);

// Get Address Routes
customerRouter.get(
  "/address/:id",
  validateCustomerToken,
  customerController.getAddressById
);

// Delete Address Routes
customerRouter.delete(
  "/address/:id",
  validateCustomerToken,
  customerController.deleteAddress
);

module.exports = customerRouter;
