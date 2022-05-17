const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    shippingAddress: {
      name: String,
      mobile: String,
      email: String,
      alternateMobile: String,
      city: String,
      address: String,
      pincode: Number,
      companyName: String,
    },
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
    products: [
      {
        name: String,
        slug: String,
        quantity: String,
        price: Number,
        weight: String,
        color: String,
        flavour: String,
        image: String,
        messageOnCake: String,
        imageOnCake: String,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
    adonProducts: [
      {
        name: String,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "adon_product",
        },
        quantity: String,
        price: Number,

        image: String,
      },
    ],
    coupon: {
      type: Object,
    },
    // couponCode: String,
    discountWithCoupon: Number,
    subtotal: Number,
    adonTotalAmount: Number,
    totalAmount: Number,
    paymentMethod: String,
    shippingMethod: Object,
    paymentId: String,
    orderStatus: {
      type: String,
      default: "PROCESSING",
    },
    cancelledBy: {
      type: String,
    },
    cancelMessage: String,
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

module.exports = mongoose.model("order", orderModel);
