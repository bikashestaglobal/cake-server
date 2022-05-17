const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  discountPercentage: Number,
  validity: { type: Date },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("deals", dealsSchema);
