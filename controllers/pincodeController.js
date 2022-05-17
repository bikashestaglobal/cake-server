const pincodeService = require("../services/pincodeService");
const constants = require("../constants");

// createPincode Controller
module.exports.createPincode = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await pincodeService.createPincode(req.body);

    response.status = 200;
    response.message = constants.pincodeMessage.PINCODE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : pincodeController: createPincode`
    );
  }
  res.status(response.status).send(response);
};

// updatePincode Controller
module.exports.updatePincode = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await pincodeService.updatePincode({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.pincodeMessage.PINCODE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : pincodeController:  updatePincode`
    );
  }
  res.status(response.status).send(response);
};

// getAllPincode Controller
module.exports.getAllPincode = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await pincodeService.getAllPincode(req.query);
    response.status = 200;
    response.message = constants.pincodeMessage.PINCODE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : pincodeController: getAllPincode`
    );
  }
  res.status(response.status).send(response);
};

//getPincodeById Controller
module.exports.getPincodeById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await pincodeService.getPincodeById(req.params);

    response.status = 200;
    response.message = constants.pincodeMessage.PINCODE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : pincodeController : getPincodeById`
    );
  }
  res.status(response.status).send(response);
};

// deletePincode Controller
module.exports.deletePincode = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await pincodeService.deletePincode(req.params);
    response.status = 200;
    response.message = constants.pincodeMessage.PINCODE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : pincodeController:  deletePincode`
    );
  }
  res.status(response.status).send(response);
};
