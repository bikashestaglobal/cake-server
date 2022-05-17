const mongoose = require("mongoose");

const couponModel = new mongoose.Schema(
  {
    code: { type: String, trim: true, required: true, unique: true },
    applyFor: { type: String, enum: ["NEW_USER", "EXISTING_USER", "ALL_USER"] },
    discountType: { type: String, enum: ["AMOUNT", "PERCENTAGE"] },
    discount: { type: Number },
    description: { type: String, trim: true },
    minimumAmount: { type: Number },
    usesTimes: { type: Number },
    startDate: { type: Date },
    validity: { type: Date },
    status: { type: Boolean, default: true },
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

module.exports = mongoose.model("coupon", couponModel);
