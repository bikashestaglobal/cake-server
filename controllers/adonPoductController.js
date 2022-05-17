const adonProductService = require("../services/adonProductService");
const constants = require("../constants");

// Create Product Controller
module.exports.createProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adonProductService.createProduct(
      req.body
    );

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adonadonProductController: createProduct`
    );
  }
  res.status(response.status).send(response);
};

// Update Product Controller
module.exports.updateProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adonProductService.updateProduct({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adonProductController:  updateProduct`
    );
  }
  res.status(response.status).send(response);
};

// Get All Product Controller
module.exports.getAllProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adonProductService.getAllProduct(
      req.query
    );
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adonProductController: getAllProduct`
    );
  }
  res.status(response.status).send(response);
};

// Get Product By ID Controller
module.exports.getProductById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adonProductService.getProductById(
      req.params
    );

    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adonProductController : getProductById`
    );
  }
  res.status(response.status).send(response);
};

// Delete Product Controller
module.exports.deleteProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adonProductService.deleteProduct(
      req.params
    );
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adonProductController:  deleteProduct`
    );
  }
  res.status(response.status).send(response);
};
