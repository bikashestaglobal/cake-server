const colorModel = require("../database/models/colorModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");
const { default: mongoose } = require("mongoose");
const categoryService = require("../services/categoryService");
const parentCategoryService = require("../services/parentCategoryService");

// Create Color Service
module.exports.createColor = async (data) => {
  try {
    const color = new colorModel(data);
    const result = await color.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService: createColor`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Color Service
module.exports.updateColor = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await colorModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService:  updateColor`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Color Service
module.exports.getAllColor = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await colorModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    // const result = await colorModel
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: "products",
    //         localField: "_id",
    //         foreignField: "colors",
    //         as: "products",
    //       },
    //     },
    //     { $unwind: "$products" },
    //     {
    //       $match: {
    //         "products.categories": {
    //           $in: [mongoose.Types.ObjectId("6241859311cbd4e66f987a99")],
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$_id",
    //         id: { $first: "$_id" },
    //         name: { $first: "$name" },
    //         products: { $push: "$products" },
    //       },
    //     },
    //   ])
    //   .skip(parseInt(skip))
    //   .limit(parseInt(limit));

    if (result) {
      return result;
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService: getAllColor`,
      error.message
    );
    throw new Error(error);
  }
};

// getColorsWithProductsByCategory Service
module.exports.getColorsWithProductsByCategory = async ({
  parCatSlug,
  catSlug,
  limit = 10,
  skip = 0,
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

    const result = await colorModel
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "color",
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
      throw new Error(constants.colorMessage.COLOR_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService: getColorsWithProductsByCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// Get ColorById Service
module.exports.getColorById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await colorModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService: getColorById`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Color Service
module.exports.deleteColor = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await colorModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: colorService: deleteColor`,
      error.message
    );
    throw new Error(error);
  }
};
