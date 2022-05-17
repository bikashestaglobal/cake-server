const customerService = require("../services/customerService");
const constants = require("../constants");

// Registration Controller
module.exports.register = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.register(req.body);
    response.status = 200;
    response.message = `${constants.customerMessage.CUSTOMER_CREATED} Needs to Verify First`;
    response.body = responseFromService;
  } catch (error) {
    if (error.message === "Need Login") {
      response.status = 302;
    }
    if (error.message === "Need Verification") {
      response.status = 401;
    }
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Account Verification Controller
module.exports.verifyAccount = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.verifyAccount(req.body);
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_VERIFIED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Login Controller
module.exports.login = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.login(req.body);
    response.status = 200;
    response.message = constants.authMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    if (error.message === "Need Verification") {
      response.status = 401;
    }
    if (error.message === "Account Disabled") {
      response.status = 403;
    }
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Get Customer profile Controller
module.exports.getProfile = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.getProfile(req.params);

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController : getCustomerProfile`
    );
  }
  res.status(response.status).send(response);
};

// getAllCustomer Controller
module.exports.getAllCustomer = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.getAllCustomer(req.query);
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController : getAllCustomer`
    );
  }
  res.status(response.status).send(response);
};

// Add Address Controller
module.exports.addAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.addAddress({
      id: req.params.customerId,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_ADDED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  addAddress`
    );
  }
  res.status(response.status).send(response);
};

// createWalletTransaction
module.exports.createWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.createWalletTransaction({
      customerId: req.params.customerId,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.TRANSACTION_ADDED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  createWalletTransaction`
    );
  }
  res.status(response.status).send(response);
};

// getAddress Controller
module.exports.getAddressById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.getAddressById({
      id: req.params.customerId,
      addressId: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  getAddress`
    );
  }
  res.status(response.status).send(response);
};

// Delete Address Controller
module.exports.deleteAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.deleteAddress({
      customerId: req.params.customerId,
      addressId: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  deleteAddress`
    );
  }
  res.status(response.status).send(response);
};

// Add Address Controller
module.exports.updateAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.updateAddress({
      id: req.params.customerId,
      addressId: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  updateAddress`
    );
  }
  res.status(response.status).send(response);
};

// deleteCustomer Controller
module.exports.deleteCustomer = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.deleteCustomer({
      customerId: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  deleteCustomer`
    );
  }
  res.status(response.status).send(response);
};

// Update Profile Controller
module.exports.updateProfile = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.updateProfile({
      id: req.params.customerId,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_UPDATE;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  updateProfile`
    );
  }
  res.status(response.status).send(response);
};
