const orderModel = require("../database/models/orderModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// createOrder Service
module.exports.createOrder = async ({ data, customerId }) => {
  try {
    const flavour = new orderModel({ ...data, customerId });
    const result = await flavour.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService: createOrder`,
      error.message
    );
    throw new Error(error);
  }
};

// updateOrder Service
module.exports.updateOrder = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService:  updateOrder`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllOrder Service
module.exports.getAllOrder = async ({
  limit = 10,
  skip = 0,
  orderStatus = "",
}) => {
  const queryCondition = {};
  if (orderStatus) {
    queryCondition.orderStatus = orderStatus;
  }
  try {
    const result = await orderModel
      .find(queryCondition)
      .populate({ path: "customerId" })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService: getAllOrder`,
      error.message
    );
    throw new Error(error);
  }
};

// getOrderById Service
module.exports.getOrderById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await orderModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService: getOrderById`,
      error.message
    );
    throw new Error(error);
  }
};

// getMyOrders Service
module.exports.getMyOrders = async ({ customerId, limit = 10, skip = 0 }) => {
  try {
    const result = await orderModel
      .find({ customerId })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService: getMyOrders`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteOrder Service
module.exports.deleteOrder = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await orderModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.orderMessage.ORDER_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: orderService: deleteOrder`,
      error.message
    );
    throw new Error(error);
  }
};
