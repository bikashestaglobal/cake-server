const mongoose = require("mongoose");

const pincodeModel = new mongoose.Schema(
  {
    pincode: { type: String, trim: true, required: true, unique: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
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

module.exports = mongoose.model("pincode", pincodeModel);
