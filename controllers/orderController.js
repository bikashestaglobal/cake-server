const orderService = require("../services/orderService");
const constants = require("../constants");

// createOrder Controller
module.exports.createOrder = async (req, res) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.createOrder({
      data: req.body,
      customerId: req.params.customerId,
    });

    response.status = 200;
    response.message = constants.orderMessage.ORDER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController: createOrder`
    );
  }
  res.status(response.status).send(response);
};

// updateOrder Controller
module.exports.updateOrder = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await orderService.updateOrder({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.orderMessage.ORDER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController:  updateOrder`
    );
  }
  res.status(response.status).send(response);
};

// getAllOrder Controller
module.exports.getAllOrder = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await orderService.getAllOrder(req.query);
    response.status = 200;
    response.message = constants.orderMessage.ORDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController: getAllOrder`
    );
  }
  res.status(response.status).send(response);
};

// getMyOrders Controller
module.exports.getMyOrders = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await orderService.getMyOrders({
      ...req.query,
      ...req.params,
    });
    response.status = 200;
    response.message = constants.orderMessage.ORDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController: getMyOrders`
    );
  }
  res.status(response.status).send(response);
};

//getOrderById Controller
module.exports.getOrderById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await orderService.getOrderById(req.params);

    response.status = 200;
    response.message = constants.orderMessage.ORDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController : getOrderById`
    );
  }
  res.status(response.status).send(response);
};

// deleteOrder Controller
module.exports.deleteOrder = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await orderService.deleteOrder(req.params);
    response.status = 200;
    response.message = constants.orderMessage.ORDER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : orderController:  deleteOrder`
    );
  }
  res.status(response.status).send(response);
};
