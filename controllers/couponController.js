const couponService = require("../services/couponService");
const constants = require("../constants");

// Create Coupon Controller
module.exports.createCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.createCoupon(req.body);

    response.status = 200;
    response.message = constants.couponMessage.COUPON_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController: createCoupon`
    );
  }
  res.status(response.status).send(response);
};

// Update Coupon Controller
module.exports.updateCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.updateCoupon({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.couponMessage.COUPON_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController:  updateCoupon`
    );
  }
  res.status(response.status).send(response);
};

// Get All Coupons Controller
module.exports.getAllCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.getAllCoupon(req.query);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponontroller: getAllCoupon`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// verifyCoupon Controller
module.exports.verifyCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.verifyCoupon(req.params);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_VERIFIED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponontroller: verifyCoupon`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// Get Coupon By ID Controller
module.exports.getCouponById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.getCouponById(req.params);

    response.status = 200;
    response.message = constants.couponMessage.COUPON_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController : getCouponById`
    );
  }
  res.status(response.status).send(response);
};

// Delete Coupon Controller
module.exports.deleteCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await couponService.deleteCoupon(req.params);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController:  deleteCcoupon`
    );
  }
  res.status(response.status).send(response);
};
