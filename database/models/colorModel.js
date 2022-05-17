const mongoose = require("mongoose");

const colorModel = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
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

module.exports = mongoose.model("color", colorModel);
