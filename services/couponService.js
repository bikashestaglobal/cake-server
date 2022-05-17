const couponModel = require("../database/models/couponModel");
const orderModel = require("../database/models/orderModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// Create Coupon Service
module.exports.createCoupon = async (data) => {
  try {
    const coupon = new couponModel(data);
    const result = await coupon.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couponService: createCoupon`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Coupon Service
module.exports.updateCoupon = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await couponModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couponService:  updateCoupon`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Coupons Service
module.exports.getAllCoupon = async ({ limit = 10, skip = 0, status }) => {
  let condition = {};
  if (status == "Active" && status != "undefined" && status != "null") {
    const today = new Date();
    condition = {
      $and: [
        { validity: { $gte: today } },
        {
          startDate: { $lte: today },
        },
      ],
    };
  }

  try {
    const result = await couponModel
      .find(condition)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couponService: getAllCoupon`,
      error.message
    );
    throw new Error(error);
  }
};

// Get All Coupons Service
module.exports.verifyCoupon = async ({ code, customerId }) => {
  try {
    const orders = await orderModel.find({ customerId });

    const today = new Date();
    condition = {
      $and: [
        { validity: { $gte: today } },
        {
          startDate: { $lte: today },
        },
        { code: code },
      ],
    };
    const coupon = await couponModel.findOne(condition);

    // For New User
    if (coupon.applyFor == "NEW_USER") {
      if (orders.length) {
        throw new Error("Coupon is Valid for Only New User");
      } else {
        return dbHelper.formatMongoData(coupon);
      }
    }

    if (coupon.applyFor == "EXISTING_USER" || coupon.applyFor == "ALL_USER") {
      const filterOrder = orders.filter((o) => {
        if (o.coupon) {
          return o.coupon.code == code;
        }
      });
      if (filterOrder.length >= coupon.usesTimes) {
        throw new Error("Already used coupon");
      } else {
        return dbHelper.formatMongoData(coupon);
      }
    }

    if (coupon) {
      // console.log("coupon", coupon);
      return dbHelper.formatMongoData(coupon);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couponService: verifyCoupon`,
      error.message
    );
    throw new Error(error);
  }
};

// Get CouponById Service
module.exports.getCouponById = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await couponModel.findOne({ _id: id });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couuponService: getCouponById`,
      error.message
    );
    throw new Error(error);
  }
};

// Delete Coupon Service
module.exports.deleteCoupon = async ({ id }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await couponModel.findOneAndDelete({ _id: id });
    console.log(result);
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.couponMessage.COUPON_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: couponService: deleteCoupon`,
      error.message
    );
    throw new Error(error);
  }
};
