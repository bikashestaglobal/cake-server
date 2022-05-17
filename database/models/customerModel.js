const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    mobile: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    shippingAddresses: [
      {
        name: String,
        mobile: String,
        alternateMobile: String,
        city: String,
        email: String,
        address: String,
        pincode: Number,
        additionalInfo: String,
        companyName: String,
      },
    ],
    billingAddress: {
      name: String,
      city: String,
      email: String,
      address: String,
      companyName: String,
      mobile: String,
      pincode: Number,
      additionalInfo: String,
    },
    wallets: [
      {
        amount: {
          type: Number,
        },
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        // delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("customer", customerSchema);
