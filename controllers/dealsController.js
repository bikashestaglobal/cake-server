const dealsService = require("../services/dealsService");
const constants = require("../constants");

// Create Deals Controller
module.exports.createDeals = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await dealsService.createDeals(req.body);

    response.status = 200;
    response.message = constants.dealsMessage.DEALS_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : adondealsController: createDeals`
    );
  }
  res.status(response.status).send(response);
};

// Update Deals Controller
module.exports.updateDeals = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await dealsService.updateDeals({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.dealsMessage.DEALS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : dealsController:  updateDeals`
    );
  }
  res.status(response.status).send(response);
};

// Get All Deals Controller
module.exports.getAllDeals = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await dealsService.getAllDeals(req.query);
    response.status = 200;
    response.message = constants.dealsMessage.DEALS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : dealsController: getAllDeals`
    );
  }
  res.status(response.status).send(response);
};

// Get Deals By ID Controller
module.exports.getDealsById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await dealsService.getDealsById(req.params);

    response.status = 200;
    response.message = constants.dealsMessage.DEALS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : dealsController : getDealsById`
    );
  }
  res.status(response.status).send(response);
};

// Delete Deals Controller
module.exports.deleteDeals = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await dealsService.deleteDeals(req.params);
    response.status = 200;
    response.message = constants.dealsMessage.DEALS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : dealsController:  deleteDeals`
    );
  }
  res.status(response.status).send(response);
};
