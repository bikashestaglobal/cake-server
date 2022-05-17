const mongoose = require("mongoose");
const shippingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
    },
    shippingTimes: [
      {
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("shipping_method", shippingSchema);
