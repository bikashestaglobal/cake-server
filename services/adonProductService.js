const productModel = require("../database/models/productModel");
const adonProductModel = require("../database/models/adonProductModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// Create Product Service
module.exports.createProduct = async (data) => {
  try {
    const product = new adonProductModel(data);
    const result = await product.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adonProductService:  createProduct`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Product Service
module.exports.updateProduct = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await adonProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adonProductService:  updateProduct`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Product Service
module.exports.getAllProduct = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await adonProductModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories.catId" })
      .populate({ path: "categories.catId" });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adonProductService: getAllProduct`,
      error.message
    );
    throw new Error(error);
  }
};

// Get productById Service
module.exports.getProductById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await adonProductModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adonProductService: getProductById`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Product Service
module.exports.deleteProduct = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await adonProductModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adonProductService: deleteProduct`,
      error.message
    );
    throw new Error(error);
  }
};
