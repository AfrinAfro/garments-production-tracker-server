const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    buyerEmail: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "in-production",
        "quality-check",
        "completed",
        "rejected",
      ],
      default: "pending",
    },

    trackingHistory: [
      {
        status: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;