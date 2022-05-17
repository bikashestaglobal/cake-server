const constants = require("../constants");
const jwt = require("jsonwebtoken");
// Token validation for admin
module.exports.validateAdminToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const response = { ...constants.defaultServerResponse };

  try {
    if (!authorization) {
      throw new Error(constants.validationMessage.TOKEN_MISSING);
    }
    // decode the token
    const token = authorization.split("Bearer ")[1];
    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "my-secret-key"
    );

    req.params.adminId = decodeToken.id;
    next();
  } catch (error) {
    response.status = 403;
    response.message = error.message;
    return res.status(response.status).send(response);
  }
};

// Token validation for customer
module.exports.validateCustomerToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const response = { ...constants.defaultServerResponse };

  try {
    if (!authorization) {
      throw new Error(constants.validationMessage.TOKEN_MISSING);
    }
    // decode the token
    const token = authorization.split("Bearer ")[1];

    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "my-secret-key"
    );

    req.params.customerId = decodeToken.id;
    next();
  } catch (error) {
    response.status = 403;
    response.message = error.message;
    return res.status(response.status).send(response);
  }
};
