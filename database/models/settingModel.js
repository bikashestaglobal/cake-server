const mongoose = require("mongoose");

const settingModel = new mongoose.Schema(
  {
    minimumOrderAmount: {
      type: Number,
      default: 500,
    },
    cashback: {
      type: Number,
    },
    slider: [
      {
        title: String,
        subTitle: String,
        image: String,
        position: Number,
        webpageUrl: String,
      },
    ],
    nextToSlider: {
      title: String,
      image: String,
      webpageUrl: String,
    },
    bestSaleBanner: {
      title: String,
      image: String,
      webpageUrl: String,
    },
    categoryPageBanner: {
      title: String,
      image: String,
      webpageUrl: String,
    },
    offerBanner: [
      {
        title: String,
        subTitle: String,
        image: String,
        position: Number,
        webpageUrl: String,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        // delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("setting", settingModel);
