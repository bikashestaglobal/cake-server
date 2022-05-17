const reviewService = require("../services/reviewService");
const constants = require("../constants");

// createReview Controller
module.exports.createReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await reviewService.createReview({
      ...req.body,
      customer: req.params.customerId,
    });

    response.status = 200;
    response.message = constants.reviewMessage.REVIEW_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : reviewController: createReview`
    );
  }
  res.status(response.status).send(response);
};

// updateReview Controller
module.exports.updateReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await reviewService.updateReview({
      id: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.reviewMessage.REVIEW_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : reviewController:  updateReview`
    );
  }
  res.status(response.status).send(response);
};

// getAllReview Controller
module.exports.getAllReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reviewService.getAllReview(req.query);
    response.status = 200;
    response.message = constants.reviewMessage.REVIEW_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : reviewController: getAllReview`
    );
  }
  res.status(response.status).send(response);
};

//getReviewById Controller
module.exports.getReviewById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await reviewService.getReviewById(req.params);

    response.status = 200;
    response.message = constants.reviewMessage.REVIEW_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : reviewController : getReviewById`
    );
  }
  res.status(response.status).send(response);
};

// deleteReview Controller
module.exports.deleteReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await reviewService.deleteReview(req.params);
    response.status = 200;
    response.message = constants.reviewMessage.REVIEW_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : reviewController:  deleteReview`
    );
  }
  res.status(response.status).send(response);
};
