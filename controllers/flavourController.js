const flavourService = require("../services/flavourService");
const constants = require("../constants");

// Create Flavour Controller
module.exports.createFlavour = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await flavourService.createFlavour(req.body);

    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController: createFlavour`
    );
  }
  res.status(response.status).send(response);
};

// Update Flavour Controller
module.exports.updateFlavour = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await flavourService.updateFlavour({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController:  updateFlavour`
    );
  }
  res.status(response.status).send(response);
};

// Get All Flavour Controller
module.exports.getAllFlavour = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await flavourService.getAllFlavour(req.query);
    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController: getAllFlavour`
    );
  }
  res.status(response.status).send(response);
};

// Get Flavour By ID Controller
module.exports.getFlavourById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await flavourService.getFlavourById(req.params);

    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController : getFlavourById`
    );
  }
  res.status(response.status).send(response);
};

//getFlavoursWithProductsByCategory Controller
module.exports.getFlavoursWithProductsByCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await flavourService.getFlavoursWithProductsByCategory(req.query);
    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController: getFlavoursWithProductsByCategory`
    );
  }
  res.status(response.status).send(response);
};

// Delete Flavour Controller
module.exports.deleteFlavour = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await flavourService.deleteFlavour(req.params);
    response.status = 200;
    response.message = constants.flavourMessage.FLAVOUR_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : flavourController:  deleteFlavour`
    );
  }
  res.status(response.status).send(response);
};
