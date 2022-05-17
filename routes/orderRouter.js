const express = require("express");
const Router = express.Router();
const orderController = require("../controllers/orderController");
const orderValidationSchema = require("../apiValidationSchemas/orderValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createOrder Flavour
Router.post(
  "/",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(orderValidationSchema.createOrder),
  orderController.createOrder
);

// updateOrder
Router.put(
  "/:id",
  joiSchemaValidation.validateBody(orderValidationSchema.updateOrder),
  orderController.updateOrder
);

// getAllOrder
Router.get(
  "/",
  joiSchemaValidation.validateQuery(orderValidationSchema.getAllOrder),
  orderController.getAllOrder
);
// getMyOrders
Router.get(
  "/myOrders",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateQuery(orderValidationSchema.getMyOrders),
  orderController.getMyOrders
);

// getOrderById
Router.get("/:id", orderController.getOrderById);

// deleteOrder
Router.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  orderController.deleteOrder
);
module.exports = Router;
