const colorService = require("../services/colorService");
const constants = require("../constants");

// Create Color Controller
module.exports.createColor = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await colorService.createColor(req.body);
    response.status = 200;
    response.message = constants.colorMessage.COLOR_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController: createColor`
    );
  }
  res.status(response.status).send(response);
};

// Update color Controller
module.exports.updateColor = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await colorService.updateColor({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.colorMessage.COLOR_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController:  updateColor`
    );
  }
  res.status(response.status).send(response);
};

// Get All Color Controller
module.exports.getAllColor = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await colorService.getAllColor(req.query);
    response.status = 200;
    response.message = constants.colorMessage.COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController: getAllColor`
    );
  }
  res.status(response.status).send(response);
};

//getColorsWithProductsByCategory Controller
module.exports.getColorsWithProductsByCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await colorService.getColorsWithProductsByCategory(req.query);
    response.status = 200;
    response.message = constants.colorMessage.COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController: getAllColor`
    );
  }
  res.status(response.status).send(response);
};

// Get ColorByID Controller
module.exports.getColorById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await colorService.getColorById(req.params);

    response.status = 200;
    response.message = constants.colorMessage.COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController : getColorById`
    );
  }
  res.status(response.status).send(response);
};

// Delete Color Controller
module.exports.deleteColor = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await colorService.deleteColor(req.params);
    response.status = 200;
    response.message = constants.colorMessage.COLOR_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : colorController:  deleteColor`
    );
  }
  res.status(response.status).send(response);
};
