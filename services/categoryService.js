const categoryModel = require("../database/models/ctegoryModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");
const { default: mongoose } = require("mongoose");

// Create Category Service
module.exports.createCategory = async (data) => {
  try {
    const category = new categoryModel(data);
    const result = await category.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: category:  createCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Category Service
module.exports.updateCategory = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await categoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Somthing Went Wrong Service: updateCategory`, error.message);
    throw new Error(error);
  }
};
// Get All Category Service
module.exports.getAllCategory = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await categoryModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: Category: getAllCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Category Service
module.exports.getCategoryByParentCatId = async (params) => {
  try {
    const result = await categoryModel.find({
      parentCategories: { $in: params },
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: categoryService : getCategoryByParentCatId`,
      error.message
    );
    throw new Error(error);
  }
};

// getCategoryByParentSlug
module.exports.getCategoryByParentSlug = async ({ slug }) => {
  console.log(slug);
  try {
    const result = await categoryModel.find().populate({
      path: "parentCategories",
      match: { slug: slug },
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: categoryService : getCategoryByParentSlug`,
      error.message
    );
    throw new Error(error);
  }
};

// Get CategoryById Service
module.exports.getCategoryById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await categoryModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: category: getCategoryById`,
      error.message
    );
    throw new Error(error);
  }
};

// getCategoryBySlug Service
module.exports.getCategoryBySlug = async ({ slug }) => {
  // console.log(slug);
  try {
    const result = await categoryModel.findOne({ slug: slug });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: category: getCategoryBySlug`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Category Service
module.exports.deleteCategory = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await categoryModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: category: deleteCategory`,
      error.message
    );
    throw new Error(error);
  }
};
