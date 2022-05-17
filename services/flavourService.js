const flavourModel = require("../database/models/flavourModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");
const categoryService = require("../services/categoryService");
const parentCategoryService = require("../services/parentCategoryService");
const mongoose = require("mongoose");

// Create Flavour Service
module.exports.createFlavour = async (data) => {
  try {
    const flavour = new flavourModel(data);
    const result = await flavour.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService: createFlavour`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Flavour Service
module.exports.updateFlavour = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await flavourModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService:  updateFlavour`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Flavour Service
module.exports.getAllFlavour = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await flavourModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService: getAllFlavour`,
      error.message
    );
    throw new Error(error);
  }
};

// Get FlavourById Service
module.exports.getFlavourById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await flavourModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService: getFlavourById`,
      error.message
    );
    throw new Error(error);
  }
};

// getFlavoursWithProductsByCategory Service
module.exports.getFlavoursWithProductsByCategory = async ({
  slug,
  limit = 10,
  skip = 0,
  parCatSlug,
  catSlug,
}) => {
  try {
    const condition = {};
    // by catSlug
    if (catSlug && catSlug != "null" && catSlug != "undefined") {
      const category = await categoryService.getCategoryBySlug({
        slug: catSlug,
      });
      condition["products.categories"] = {
        $in: [mongoose.Types.ObjectId(category._id.toString())],
      };
    }

    // by parCatSlug
    if (parCatSlug && parCatSlug != "null" && parCatSlug != "undefined") {
      const category = await parentCategoryService.getCategoryBySlug({
        slug: parCatSlug,
      });
      condition["products.parentCategories"] = {
        $in: [mongoose.Types.ObjectId(category._id.toString())],
      };
    }

    const result = await flavourModel
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "flavour",
            as: "products",
          },
        },
        { $unwind: "$products" },
        {
          $match: {
            ...condition,
          },
        },
        {
          $group: {
            _id: "$_id",
            id: { $first: "$_id" },
            name: { $first: "$name" },
            products: { $push: "$products" },
          },
        },
      ])
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    if (result) {
      return result;
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService: getFlavoursWithProductsByCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Flavour Service
module.exports.deleteFlavour = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await flavourModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.flavourMessage.FLAVOUR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: flavourService: deleteFlavour`,
      error.message
    );
    throw new Error(error);
  }
};
