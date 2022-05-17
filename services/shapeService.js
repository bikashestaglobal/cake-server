const shapeModel = require("../database/models/shapeModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// createShape Service
module.exports.createShape = async (data) => {
  try {
    const flavour = new shapeModel(data);
    const result = await flavour.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shapeService: createShape`,
      error.message
    );
    throw new Error(error);
  }
};

// updateShape Service
module.exports.updateShape = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await shapeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shapeService:  updateShape`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllShape Service
module.exports.getAllShape = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await shapeModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shapeService: getAllShape`,
      error.message
    );
    throw new Error(error);
  }
};

// getShapeById Service
module.exports.getShapeById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await shapeModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shapeService: getShapeById`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteShape Service
module.exports.deleteShape = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await shapeModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: shapeService: deleteShape`,
      error.message
    );
    throw new Error(error);
  }
};
