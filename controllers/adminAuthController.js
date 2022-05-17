const adminAuthService = require("../services/adminAuthService");
const constants = require("../constants");

// Admin Registration Controller
module.exports.register = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adminAuthService.register(req.body);
    response.status = 200;
    response.message = constants.adminMessage.ADMIN_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Admin Login Controller
module.exports.login = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adminAuthService.login(req.body);
    response.status = 200;
    response.message = constants.authMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
