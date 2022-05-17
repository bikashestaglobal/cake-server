const pincodeModel = require("../database/models/pincodeModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// createPincode Service
module.exports.createPincode = async (data) => {
  try {
    const flavour = new pincodeModel(data);
    const result = await flavour.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.pincodeMessage.PINCODE_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: pincodeService: createPincode`,
      error.message
    );
    throw new Error(error);
  }
};

// updatePincode Service
module.exports.updatePincode = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await pincodeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.pincodeMessage.PINCODE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: pincodeService:  updatePincode`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllPincode Service
module.exports.getAllPincode = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await pincodeModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.pincodeMessage.PINCODE_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: pincodeService: getAllPincode`,
      error.message
    );
    throw new Error(error);
  }
};

// getPincodeById Service
module.exports.getPincodeById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await pincodeModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.pincodeMessage.PINCODE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: pincodeService: getPincodeById`,
      error.message
    );
    throw new Error(error);
  }
};

// deletePincode Service
module.exports.deletePincode = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await pincodeModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.pincodeMessage.PINCODE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: pincodeService: deletePincode`,
      error.message
    );
    throw new Error(error);
  }
};
