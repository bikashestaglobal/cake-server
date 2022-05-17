const parentCategoryService = require("../services/parentCategoryService");
const constants = require("../constants");

// Create Category Controller
module.exports.createCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.createCategory(
      req.body
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : createCategory`);
  }
  res.status(response.status).send(response);
};

// Get All Category Controller
module.exports.getAllCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.getAllCategory(
      req.query
    );

    if (responseFromService) {
      response.status = 200;
      response.message = constants.categoryMessage.CATEGORY_FETCHED;
      response.body = responseFromService;
    } else {
      response.status = 400;
      response.message = constants.categoryMessage.CATEGORY_NOT_FETCHED;
      response.body = [];
    }
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : getAllCategory`);
  }
  res.status(response.status).send(response);
};

// Get Category By ID Controller
module.exports.getCategoryById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.getCategoryById(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : getCategoryById`);
  }
  res.status(response.status).send(response);
};

// getCategoryBySlug Controller
module.exports.getCategoryBySlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.getCategoryBySlug(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : getCategoryBySlug`);
  }
  res.status(response.status).send(response);
};

// Update Category Controller
module.exports.updateCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.updateCategory({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : updateCategory`);
  }
  res.status(response.status).send(response);
};

// Delete Category Controller
module.exports.deleteCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await parentCategoryService.deleteCategory(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(`Something went Wrong Controller : deleteCategory`);
  }
  res.status(response.status).send(response);
};
