const productService = require("../services/productService");
const constants = require("../constants");

// Create Product Controller
module.exports.createProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.createProduct(req.body);

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController: createProduct`
    );
  }
  res.status(response.status).send(response);
};

// Update Product Controller
module.exports.updateProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.updateProduct({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController:  updateProduct`
    );
  }
  res.status(response.status).send(response);
};

// Get All Product Controller
module.exports.getAllProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getAllProduct(req.query);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController: getAllProduct`
    );
  }
  res.status(response.status).send(response);
};

// filterProducts Controller
module.exports.filterProducts = async (req, res) => {
  console.log(req.body);
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.filterProducts(req.body);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController: filterProducts`
    );
  }
  res.status(response.status).send(response);
};

// searchProducts Controller
module.exports.searchProducts = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.searchProducts(req.query);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController: searchProducts`
    );
  }
  res.status(response.status).send(response);
};

// Get Product By ID Controller
module.exports.getProductById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getProductById(req.params);

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController : getProductById`
    );
  }
  res.status(response.status).send(response);
};

// getProductByCategory Controller
module.exports.getProductByCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await productService.getProductsByCategory(
      req.query
    );

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController : getProductByCategory`
    );
  }
  res.status(response.status).send(response);
};

// getProductsByCategorySlug Controller
module.exports.getProductsByCategorySlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getProductsByCategorySlug({
      ...req.params,
      ...req.query,
    });

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController : getProductsByCategorySlug`
    );
  }
  res.status(response.status).send(response);
};

// getProductsByParCategorySlug Controller
module.exports.getProductsByParCategorySlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await productService.getProductsByParCategorySlug({
        ...req.params,
        ...req.query,
      });

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController : getProductsByParCategorySlug`
    );
  }
  res.status(response.status).send(response);
};

// getProductBySlug Controller
module.exports.getProductBySlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getProductBySlug(
      req.params
    );

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController : getProductBySlug`
    );
  }
  res.status(response.status).send(response);
};

// Delete Product Controller
module.exports.deleteProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.deleteProduct(req.params);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : productController:  deleteProduct`
    );
  }
  res.status(response.status).send(response);
};
