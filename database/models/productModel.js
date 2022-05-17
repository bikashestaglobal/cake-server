const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    skus: [
      {
        mrp: Number,
        sellingPrice: Number,
        weight: String,
      },
    ],
    flavour: { type: mongoose.Schema.Types.ObjectId, ref: "flavour" },

    color: { type: mongoose.Schema.Types.ObjectId, ref: "color" },
    shape: { type: mongoose.Schema.Types.ObjectId, ref: "shape" },
    size: String, // 6 inches in diameter
    reviews: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "customer",
        },
        rating: Number,
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEggCake: {
      type: Boolean,
      default: false,
    },
    isPhotoCake: {
      type: Boolean,
    },
    parentCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "parent_category",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    images: [
      {
        url: String,
      },
    ],
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

module.exports = mongoose.model("product", productSchema);
