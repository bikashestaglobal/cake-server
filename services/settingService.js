const settingModel = require("../database/models/settingModel");
const constants = require("../constants");
const dbHelper = require("../helpers/dbHelper");

// Create or Update Settinf
module.exports.createUpdateSetting = async (data) => {
  try {
    const settingData = (await settingModel.findOne({})) || {};
    // If Setting is available then update

    if (Object.keys(settingData).length) {
      const result = await settingModel.findByIdAndUpdate(
        settingData._id,
        data,
        { new: true }
      );
      console.log(result);
      if (result) {
        return dbHelper.formatMongoData(result);
      } else {
        throw new Error(constants.settingMessage.SETTING_NOT_UPDATED);
      }
    }

    // If setting is not available the create new
    const setting = new settingModel(data);
    const result = await setting.save();
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.settingMessage.SETTING_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: settingService: createUpdateSetting`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllSetting
module.exports.getAllSetting = async () => {
  try {
    const result = await settingModel.findOne({});
    if (result) {
      return dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.settingMessage.SETTING_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: settingService: getAllSetting`,
      error.message
    );
    throw new Error(error);
  }
};
