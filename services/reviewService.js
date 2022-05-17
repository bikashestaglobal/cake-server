const reviewModel = require("../database/models/reviewModel");
const productModel = require("../database/models/productModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");
const { default: mongoose } = require("mongoose");

// createReview Service
module.exports.createReview = async (serviceData) => {
  const { product } = serviceData;
  delete serviceData.product;
  try {
    const result = await productModel.findOneAndUpdate(
      { _id: product },
      {
        $push: {
          reviews: serviceData,
        },
      },
      { new: true }
    );
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.reviewMessage.REVIEW_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: reviewService: createReview`,
      error.message
    );
    throw new Error(error);
  }
};

// updateReview Service
module.exports.updateReview = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await reviewModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.reviewMessage.REVIEW_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: reviewService:  updateReview`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllReview Service
module.exports.getAllReview = async ({
  limit = 10,
  skip = 0,
  product = "",
}) => {
  const findFilter = {};
  if (product) {
    findFilter.product = mongoose.Types.ObjectId(product);
  }

  try {
    const result = await reviewModel
      .find(findFilter)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("customer")
      .populate("product");
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: reviewService: getAllReview`,
      error.message
    );
    throw new Error(error);
  }
};

// getReviewById Service
module.exports.getReviewById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await reviewModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: reviewService: getReviewById`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteReview Service
module.exports.deleteReview = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await reviewModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: reviewService: deleteReview`,
      error.message
    );
    throw new Error(error);
  }
};
