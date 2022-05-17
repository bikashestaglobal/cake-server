const settingService = require("../services/settingService");
const constants = require("../constants");

// Create Update Setting Controller
module.exports.createUpdateSetting = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingService.createUpdateSetting(
      req.body
    );

    response.status = 200;
    response.message = constants.settingMessage.SETTING_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : settingController: createUpdateSetting`
    );
  }
  res.status(response.status).send(response);
};

// getAllSetting Controller
module.exports.getAllSetting = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingService.getAllSetting();
    response.status = 200;
    response.message = constants.settingMessage.SETTING_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : settingController: getAllSetting`
    );
  }
  res.status(response.status).send(response);
};
