const productModel = require("../database/models/productModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");
const categoryService = require("../services/categoryService");
const parentCategoryService = require("../services/parentCategoryService");
const { default: mongoose } = require("mongoose");

// Create Product Service
module.exports.createProduct = async (data) => {
  try {
    const product = new productModel(data);
    const result = await product.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: product:  createProduct`,
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

    const result = await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService:  updateProduct`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Product Service
module.exports.getAllProduct = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await productModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" })
      .populate({ path: "categories" })
      .populate({ path: "color" })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "reviews.customer" });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getAllProduct`,
      error.message
    );
    throw new Error(error);
  }
};

// filterProducts Service
module.exports.filterProducts = async (body) => {
  let {
    skip = 0,
    limit = 10,
    colors = [],
    flavours = [],
    catId,
    parCatId,
  } = body;
  flavours = flavours.map((flavour) => mongoose.Types.ObjectId(flavour));
  colors = colors.map((color) => mongoose.Types.ObjectId(color));

  // catId
  const condition = [];
  if (parCatId != "null" && parCatId != "undefined" && parCatId) {
    condition.push({ parentCategories: mongoose.Types.ObjectId(parCatId) });
  }
  if (catId != "null" && catId != "undefined" && catId) {
    condition.push({ categories: mongoose.Types.ObjectId(catId) });
  }
  condition.push({
    $or: [{ color: { $in: colors } }, { flavour: { $in: flavours } }],
  });

  console.log(condition);

  try {
    const result = await productModel
      .find({
        $and: condition,
      })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" })
      .populate({ path: "color" })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "categories" });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: filterProducts`,
      error.message
    );
    throw new Error(error);
  }
};

// getProductByCategory Service
// module.exports.getProductByCategory = async ({
//   categoryId,
//   limit = 10,
//   skip = 0,
// }) => {
//   try {
//     const result = await productModel
//       .find({ categories: categoryId })
//       .skip(parseInt(skip))
//       .limit(parseInt(limit))
//       .populate({ path: "parentCategories" })
//       .populate({ path: "categories" });

//     if (result) {
//       return dbHelper.formatMongoData(result);
//     } else {
//       throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: productService: getProductByCategory`,
//       error.message
//     );
//     throw new Error(error);
//   }
// };

// Get productById Service
module.exports.getProductById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await productModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getProductById`,
      error.message
    );
    throw new Error(error);
  }
};

// searchProducts Service
module.exports.searchProducts = async ({
  query,
  category = "",
  limit = 10,
  skip = 0,
}) => {
  let condition = {
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      },
      { status: true },
    ],
  };

  console.log(query, category);

  if (category) {
    condition.$and.push({ categories: mongoose.Types.ObjectId(category) });
  }

  try {
    const result = await productModel
      .find(condition)
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: searchProducts`,
      error.message
    );
    throw new Error(error);
  }
};

// getProductsByCategorySlug Service
module.exports.getProductsByCategorySlug = async ({
  slug,
  limit = 10,
  skip = 0,
}) => {
  try {
    const category = await categoryService.getCategoryBySlug({ slug });

    const result = await productModel
      .find({ categories: { $in: [category._id] } })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" })
      .populate({ path: "color" })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "categories" });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getProductsByCategorySlug`,
      error.message
    );
    throw new Error(error);
  }
};

// Test
// getProductsByCategorySlug Service
module.exports.getProductsByCategory = async ({
  parCatSlug,
  categoryId,
  catSlug,
  limit = 10,
  color,
  shape,
  flavour,
  skip = 0,
  minPrice,
  maxPrice,
}) => {
  try {
    const condition = {};
    let subCondition = {};

    // By Flavour
    if (flavour && flavour != "undefined" && flavour != "null") {
      condition.flavour = mongoose.Types.ObjectId(flavour);
    }

    // By color
    if (color && color != "undefined" && color != "null") {
      condition.color = mongoose.Types.ObjectId(color);
    }
    // By shape
    if (shape && shape != "undefined" && shape != "null") {
      condition.shape = mongoose.Types.ObjectId(shape);
    }

    // By Category Slug
    if (catSlug && catSlug != "undefined" && catSlug != "null") {
      const category = await categoryService.getCategoryBySlug({
        slug: catSlug,
      });
      condition.categories = { $in: [category._id] };
    }

    // By Parent Ctegory Slug
    if (parCatSlug && parCatSlug != "undefined" && parCatSlug != "null") {
      const parCategory = await parentCategoryService.getCategoryBySlug({
        slug: parCatSlug,
      });
      condition.parentCategories = { $in: [parCategory._id] };
    }

    // By Category Id
    if (categoryId && categoryId != "undefined" && categoryId != "null") {
      condition.categories = categoryId;
    }

    // Filter with maxPrice
    if (maxPrice && maxPrice != "undefined" && maxPrice != "null") {
      condition.skus = { $elemMatch: { sellingPrice: { $lte: maxPrice } } };
      if (minPrice == "null" || minPrice == "undefined") {
        subCondition = {
          _id: 0,
          name: 1,
          color: 1,
          flavour: 1,
          reviews: 1,
          slug: 1,
          images: 1,
          shape: 1,
          skus: { $elemMatch: { sellingPrice: { $lte: maxPrice } } },
        };
      }
    }

    // Filter with minPrice and maxPrice
    if (
      maxPrice &&
      maxPrice != "undefined" &&
      maxPrice != "null" &&
      minPrice &&
      minPrice != "undefined" &&
      minPrice != "null"
    ) {
      condition.skus = {
        $elemMatch: { sellingPrice: { $gte: minPrice, $lte: maxPrice } },
      };
      subCondition = {
        _id: 0,
        name: 1,
        color: 1,
        flavour: 1,
        slug: 1,
        reviews: 1,
        images: 1,
        shape: 1,
        skus: {
          $elemMatch: { sellingPrice: { $gte: minPrice, $lte: maxPrice } },
        },
      };
    }

    const result = await productModel
      .find(condition, subCondition)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" })
      .populate({ path: "color" })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "categories" });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getProductsByCategorySlug`,
      error.message
    );
    throw new Error(error);
  }
};

// getProductsByParCategorySlug Service
module.exports.getProductsByParCategorySlug = async ({
  slug,
  limit = 10,
  skip = 0,
}) => {
  try {
    const category = await parentCategoryService.getCategoryBySlug({ slug });

    const result = await productModel
      .find({ parentCategories: { $in: [category._id] } })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "parentCategories" })
      .populate({ path: "color" })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "categories" });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getProductsByCategorySlug`,
      error.message
    );
    throw new Error(error);
  }
};

// Get productBySlug Service
module.exports.getProductBySlug = async ({ slug }) => {
  try {
    const result = await productModel
      .findOne({ slug })
      .populate({ path: "flavour" })
      .populate({ path: "shape" })
      .populate({ path: "color" })
      .populate({ path: "parentCategories" })
      .populate({ path: "categories" })
      .populate({ path: "reviews.customer" });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: getProductBySlug`,
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
    const result = await productModel.findOneAndDelete({ _id: id });

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: productService: deleteProduct`,
      error.message
    );
    throw new Error(error);
  }
};
