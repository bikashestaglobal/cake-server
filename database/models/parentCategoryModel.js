const mongoose = require("mongoose");

const parentCategorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    image: { type: String },
    description: { type: String, trim: true },
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

module.exports = mongoose.model("parent_category", parentCategorySchema);
