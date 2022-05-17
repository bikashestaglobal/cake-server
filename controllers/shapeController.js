const shapeService = require("../services/shapeService");
const constants = require("../constants");

// createShape Controller
module.exports.createShape = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shapeService.createShape(req.body);

    response.status = 200;
    response.message = constants.shapeMessage.SHAPE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : typeController: createShape`
    );
  }
  res.status(response.status).send(response);
};

// updateShape Controller
module.exports.updateShape = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shapeService.updateShape({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.shapeMessage.SHAPE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : typeController:  updateShape`
    );
  }
  res.status(response.status).send(response);
};

// getAllShape Controller
module.exports.getAllShape = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shapeService.getAllShape(req.query);
    response.status = 200;
    response.message = constants.shapeMessage.SHAPE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : typeController: getAllShape`
    );
  }
  res.status(response.status).send(response);
};

//getShapeById Controller
module.exports.getShapeById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shapeService.getShapeById(req.params);

    response.status = 200;
    response.message = constants.shapeMessage.SHAPE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : typeController : getShapeById`
    );
  }
  res.status(response.status).send(response);
};

// deleteShape Controller
module.exports.deleteShape = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shapeService.deleteShape(req.params);
    response.status = 200;
    response.message = constants.shapeMessage.SHAPE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : typeController:  deleteShape`
    );
  }
  res.status(response.status).send(response);
};
