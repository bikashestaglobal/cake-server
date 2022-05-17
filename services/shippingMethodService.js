const shippingMethodModel = require("../database/models/shippingMethodModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// Create Shipping Method
module.exports.createShipingMethod = async (data) => {
  try {
    const shippingMethod = new shippingMethodModel(data);
    const result = await shippingMethod.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(
        constants.shippingMethodMessage.SHIPPING_METHOD_NOT_CREATED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shippingMethodService: createShippingMetho`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Shipping Method Service
module.exports.updateShipingMethod = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await shippingMethodModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(
        constants.shippingMethodMessage.SHIPPING_METHOD_NOT_UPDATED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shippingMethodService:  updateShippingMethod`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All shippingMethod Service
module.exports.getAllShippingMethod = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await shippingMethodModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(
        constants.shippingMethodMessage.SHIPPING_METHOD_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shippingMethodService: getAllShippingMethod`,
      error.message
    );
    throw new Error(error);
  }
};

// Get shippingMethod Service
module.exports.getShippingMethodById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await shippingMethodModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(
        constants.shippingMethodMessage.SHIPPING_METHOD_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shippingMethodService: getShippingMethodById`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete shippingMethod Service
module.exports.deleteShippingMethod = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await shippingMethodModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(
        constants.shippingMethodMessage.SHIPPING_METHOD_NOT_FOUND
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shippingMethodService: deleteShippingMethod`,
      error.message
    );
    throw new Error(error);
  }
};
