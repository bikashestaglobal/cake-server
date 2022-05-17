const shippingMethodService = require("../services/shippingMethodService");
const constants = require("../constants");

// Create Shipping Method Controller
module.exports.createShippingMethod = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shippingMethodService.createShipingMethod(
      req.body
    );

    response.status = 200;
    response.message = constants.shippingMethodMessage.SHIPPING_METHOD_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : shippingMethodController: createShippingMethod`
    );
  }
  res.status(response.status).send(response);
};

// Update ShippingMethod Controller
module.exports.updateShippingMethod = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await shippingMethodService.updateShipingMethod(
      {
        id: req.params.id,
        data: req.body,
      }
    );

    response.status = 200;
    response.message = constants.shippingMethodMessage.SHIPPING_METHOD_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : shippingMethodController:  updateShippingMethod`
    );
  }
  res.status(response.status).send(response);
};

// Get All shippingMethods Controller
module.exports.getAllShippingMethod = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await shippingMethodService.getAllShippingMethod(req.query);
    response.status = 200;
    response.message = constants.shippingMethodMessage.SHIPPING_METHOD_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : shippingMethodController: getAllShippingMethod`
    );
  }
  res.status(response.status).send(response);
};

// Get Coupon By ID Controller
module.exports.getShippingMethodById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await shippingMethodService.getShippingMethodById(req.params);

    response.status = 200;
    response.message = constants.shippingMethodMessage.SHIPPING_METHOD_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : shippingMethodController : getShippingMethodById`
    );
  }
  res.status(response.status).send(response);
};

// Delete shippingMethod Controller
module.exports.deleteShippingMethod = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService =
      await shippingMethodService.deleteShippingMethod(req.params);
    response.status = 200;
    response.message = constants.shippingMethodMessage.SHIPPING_METHOD_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : shippingMethodController:  deleteShippingMethod`
    );
  }
  res.status(response.status).send(response);
};
