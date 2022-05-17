const adminModel = require("../database/models/adminModel");
const constants = require("../constants");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration Service
module.exports.register = async (serviceData) => {
  try {
    // Check Email is already exist or not
    const adminData = await adminModel.findOne({ email: serviceData.email });
    if (adminData) {
      throw new Error(constants.authMessage.EMAIL_EXISTS);
    }
    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);

    const admin = new adminModel(serviceData);

    const result = await admin.save();
    if (result) {
      // generate jwt token
      const token = jwt.sign(
        { id: result._id },
        process.env.JWT_SECRET_KEY || "my-secret-key",
        { expiresIn: "2 days" }
      );
      const formatData = result.toObject();
      return { ...formatData, token };
    } else {
      throw new Error("Data not Inserted");
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminAuthService: register`);
    throw new Error(error.message);
  }
};

// Login Service
module.exports.login = async (serviceData) => {
  try {
    // Find admin
    const adminData = await adminModel.findOne({ email: serviceData.email });
    if (adminData) {
      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        adminData.password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: adminData._id },
          process.env.JWT_SECRET_KEY || "my-secret-key",
          { expiresIn: "2 days" }
        );
        const formatData = adminData.toObject();
        return { ...formatData, token };
      } else {
        throw new Error(constants.authMessage.INVALID_PASSWORD);
      }
    } else {
      throw new Error(constants.authMessage.INVALID_EMAIL);
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminAuthService: register`);
    throw new Error(error.message);
  }
};
