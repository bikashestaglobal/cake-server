const mongoose = require("mongoose");

const adonProductSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    sellingPrice: Number,
    parentCategories: [
      {
        catId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "parent_category",
        },
      },
    ],
    categories: [
      {
        catId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
        },
      },
    ],
    image: String,
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

module.exports = mongoose.model("adon_product", adonProductSchema);
