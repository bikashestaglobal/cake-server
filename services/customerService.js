const customerModel = require("../database/models/customerModel");
const constants = require("../constants");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = require("../helpers/helper");
const dbHelper = require("../helpers/dbHelper");
// Registration Service
module.exports.register = async (serviceData) => {
  try {
    // Check Email is already exist or not
    const customerData = await customerModel.findOne({
      email: serviceData.email,
    });

    // If data exists and not verified
    if (customerData && !customerData.isVerified) {
      // Send Email
      helper.sendOTPEmail({
        emailTo: serviceData.email,
        subject: "OTP Verification",
        name: serviceData.name,
        otp: serviceData.otp,
      });

      throw new Error(constants.authMessage.NEED_VERIFICATION);
    }

    // If data exists and verified
    if (customerData && customerData.isVerified) {
      throw new Error(constants.authMessage.NEED_LOGIN);
    }

    // Send Email
    helper.sendOTPEmail({
      emailTo: serviceData.email,
      subject: "OTP Verification",
      name: serviceData.name,
      otp: serviceData.otp,
    });

    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);

    const customer = new customerModel(serviceData);

    const result = await customer.save();
    if (result) {
      //   // generate jwt token
      //   const token = jwt.sign(
      //     { id: result._id },
      //     process.env.JWT_SECRET_KEY || "my-secret-key",
      //     { expiresIn: "2 days" }
      //   );
      const formatData = result.toObject();
      return { ...formatData };
    } else {
      throw new Error("Data not Inserted");
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: register`);
    throw new Error(error.message);
  }
};

// Verify Account Service
module.exports.verifyAccount = async ({ email }) => {
  try {
    const data = {
      isVerified: true,
      status: true,
    };
    // Check id is valid or not
    // if (!dbHelper.checkMongoObject(id)) {
    //   throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    // }

    const result = await customerModel.findOneAndUpdate({ email }, data, {
      new: true,
    });
    if (result) {
      // generate jwt token
      const token = jwt.sign(
        { id: result._id },
        process.env.JWT_SECRET_KEY || "my-secret-key",
        { expiresIn: "2 days" }
      );
      const formatData = dbHelper.formatMongoData(result);
      return { ...formatData, token };
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_VERIFICATION_FAILED);
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: verifyAccount`);
    throw new Error(error.message);
  }
};

// Login Service
module.exports.login = async (serviceData) => {
  try {
    // Find admin
    const customerData = await customerModel.findOne({
      email: serviceData.email,
    });
    if (customerData) {
      // If customer status is not active
      if (!customerData.status) {
        throw new Error(constants.authMessage.ACCOUNT_DISABLED);
      }

      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        customerData.password
      );
      if (isCorrect) {
        // If customer not verified
        if (!customerData.isVerified) {
          // Send Email
          helper.sendOTPEmail({
            emailTo: customerData.email,
            subject: "OTP Verification",
            name: customerData.name,
            otp: serviceData.otp,
          });

          throw new Error(constants.authMessage.NEED_VERIFICATION);
        }

        // Sign jwt token
        const token = jwt.sign(
          { id: customerData._id },
          process.env.JWT_SECRET_KEY || "my-secret-key"
        );
        const formatData = customerData.toObject();
        return { ...formatData, token };
      } else {
        throw new Error(constants.authMessage.INVALID_PASSWORD);
      }
    } else {
      throw new Error(constants.authMessage.INVALID_EMAIL);
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: login`);
    throw new Error(error.message);
  }
};

// Get Profile Service
module.exports.getProfile = async ({ customerId }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(customerId)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await customerModel.findOne({ _id: customerId });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getCustomerProfile`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllCustomer Service
module.exports.getAllCustomer = async ({ limit = 10, skip = 0 }) => {
  try {
    const result = await customerModel
      .find({})
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getAllCustomer`,
      error.message
    );
    throw new Error(error);
  }
};

// Update Profile Service
module.exports.updateProfile = async ({ id, data }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(id)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    // If Password available
    if (data.password) {
      data.password = await bcryptjs.hash(data.password, 12);
    }

    // const result = await customerModel.findByIdAndUpdate(id, data, {
    //   new: true,
    // });

    const updateData = {};
    updateData.$set = { ...data };
    if (data.shippingAddress) {
      updateData.$push = { shippingAddresses: data.shippingAddress };
    }

    if (data.sameAddress) {
      updateData.$push = { shippingAddresses: data.billingAddress };
    }

    const result = await customerModel.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
      }
    );

    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_UPDATE);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService:  updateProfile`,
      error.message
    );
    throw new Error(error);
  }
};

// Add Address
module.exports.addAddress = async ({ id, data }) => {
  try {
    const result = await customerModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { shippingAddresses: data },
      },
      { new: true }
    );
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.ADDRESS_NOT_ADDED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: addAddress`,
      error.message
    );
    throw new Error(error);
  }
};

// Get Address Service
module.exports.getAddressById = async ({ id, addressId }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(addressId)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }
    const result = await customerModel.findOne(
      { "shippingAddresses._id": addressId },
      { _id: 1, shippingAddresses: { $elemMatch: { _id: addressId } } }
    );
    if (result) {
      return dbHelper.formatMongoData(result.shippingAddresses[0]);
    } else {
      throw new Error(constants.customerMessage.ADDRESS_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getAddres`,
      error.message
    );
    throw new Error(error);
  }
};

// Add Address
module.exports.deleteAddress = async ({ customerId, addressId }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(addressId)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await customerModel.findOneAndUpdate(
      { _id: customerId },
      {
        $pull: { shippingAddresses: { _id: addressId } },
      }
    );
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.ADDRESS_NOT_DELETE);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: deleteAddress`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteCustomer
module.exports.deleteCustomer = async ({ customerId }) => {
  try {
    // Check id is valid or not
    if (!dbHelper.checkMongoObject(customerId)) {
      throw new Error(constants.databaseMessage.INVALID_OBJECTID);
    }

    const result = await customerModel.findOneAndDelete({ _id: customerId });
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: deleteCustomer`,
      error.message
    );
    throw new Error(error);
  }
};

// Apdate Address
module.exports.updateAddress = async ({ id, addressId, data }) => {
  try {
    const keys = Object.keys(data);
    const address = {};
    for (key of keys) {
      address["shippingAddresses.$." + key] = data[key];
    }

    const result = await customerModel.findOneAndUpdate(
      { "shippingAddresses._id": addressId },
      {
        $set: address,
      },
      { new: true }
    );
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.ADDRESS_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: updateAddress`,
      error.message
    );
    throw new Error(error);
  }
};

// createWalletTransaction
module.exports.createWalletTransaction = async ({ customerId, data }) => {
  try {
    const result = await customerModel.findOneAndUpdate(
      { _id: customerId },
      {
        $push: { wallets: data },
      },
      { new: true }
    );
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.TRANSACTION_NOT_ADDED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: createWalletTransaction`,
      error.message
    );
    throw new Error(error);
  }
};
