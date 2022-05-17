const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    rating: Number,
    message: String,
    replies: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "customer",
        },
        messsage: String,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, oprion) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("review", reviewSchema);
