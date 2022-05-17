const dealsModel = require("../database/models/dealsModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// Create Deals Service
module.exports.createDeals = async (data) => {
  try {
    const deals = new dealsModel(data);
    const result = await deals.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.dealsMessage.DEALS_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: dealsService:  createDeals`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Deals Service
module.exports.updateDeals = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await dealsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.dealsMessage.DEALS_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: dealsService:  updateDeals`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Deals Service
module.exports.getAllDeals = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await dealsModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "products.productId" });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.dealsMessage.DEALS_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: dealsService: getAllDeals`,
      error.message
    );
    throw new Error(error);
  }
};

// Get dealsById Service
module.exports.getDealsById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await dealsModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.dealsMessage.DEALS_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: dealsService: getDealsById`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Deals Service
module.exports.deleteDeals = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await dealsModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.dealsMessage.DEALS_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: dealsService: deleteDeals`,
      error.message
    );
    throw new Error(error);
  }
};
