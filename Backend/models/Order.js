const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        // User who created this order
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderId: String,
        amount: Number,
        razorpayOrderId: String,
        paymentId: String,

        status: {
            type: String,
            default: "CREATED"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);