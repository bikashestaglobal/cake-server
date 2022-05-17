const categoryService = require("../services/categoryService");
const constants = require("../constants");

// Create Product Controller
module.exports.createCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.createCategory(req.body);

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController: createCategory`
    );
  }
  res.status(response.status).send(response);
};

// Update Category Controller
module.exports.updateCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.updateCategory({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController:  updateCategory`
    );
  }
  res.status(response.status).send(response);
};

// Get All Category Controller
module.exports.getAllCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.getAllCategory(req.query);
    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController: getAllCategory`
    );
  }
  res.status(response.status).send(response);
};

// Get Category By ID Controller
module.exports.getCategoryById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.getCategoryById(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController : getCategoryById`
    );
  }
  res.status(response.status).send(response);
};

// getCategoryBySlug Controller
module.exports.getCategoryBySlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.getCategoryBySlug(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController : getCategoryBySlug`
    );
  }
  res.status(response.status).send(response);
};

// Get Category By Parent cat ID Controller
module.exports.getCategoryByParentCatId = async (req, res) => {
  // const params = req.params[0].split("/");

  // // [req.params.arr].concat(req.params[0].split("/").slice(1));
  // console.log(req.params);
  // console.log(params);
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.getCategoryByParentCatId(
      req.body.catId
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController : getCategoryByParentCatId`
    );
  }
  res.status(response.status).send(response);
};

// Get Category By Parent Slug Controller
module.exports.getCategoryByParentSlug = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.getCategoryByParentSlug(
      req.params
    );

    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController : getCategoryByParentSlug`
    );
  }
  res.status(response.status).send(response);
};

// Delete Category Controller
module.exports.deleteCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await categoryService.deleteCategory(
      req.params
    );
    response.status = 200;
    response.message = constants.categoryMessage.CATEGORY_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : categoryController:  deleteCategory`
    );
  }
  res.status(response.status).send(response);
};
