const { default: mongoose } = require("mongoose");
const constants = require("../constants");
const parentCategoryModel = require("../database/models/parentCategoryModel");
const dbHelper = require("../helpers/dbHelper");

// Create Category Service
module.exports.createCategory = async (data) => {
  try {
    const category = new parentCategoryModel(data);
    const result = await category.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Somthing Went Wrong Service: createCategory`, error.message);
    throw new Error(error);
  }
};

// Get All Category Service
module.exports.getAllCategory = async ({ limit = 0, skip = 0 }) => {
  // try {
  //   const result = await parentCategoryModel
  //     .find({})
  //     .skip(parseInt(skip))
  //     .limit(parseInt(limit));
  //   return dbHelper.formatMongoData(result);
  // } catch (error) {
  //   console.log(`Somthing Went Wrong Service: getAllCategory`, error.message);
  //   throw new Error(error);
  // }

  try {
    const result = await parentCategoryModel
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parentCategories",
            as: "subCategories",
          },
        },
      ])
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return result;
  } catch (error) {
    console.log(`Somthing Went Wrong Service: getAllCategory`, error.message);
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
    const result = await parentCategoryModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(`Somthing Went Wrong Service: getCategoryById`, error.message);
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

    const result = await parentCategoryModel.findByIdAndUpdate(id, data, {
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

// Delete Category Service
module.exports.deleteCategory = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await parentCategoryModel.findByIdAndDelete(id);

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Somthing Went Wrong Service: deleteCategory`, error.message);
    throw new Error(error);
  }
};

// getCategoryBySlug Service
module.exports.getCategoryBySlug = async ({ slug }) => {
  try {
    const result = await parentCategoryModel.findOne({ slug: slug });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: parentcCategory: getCategoryBySlug`,
      error.message
    );
    throw new Error(error);
  }
};
