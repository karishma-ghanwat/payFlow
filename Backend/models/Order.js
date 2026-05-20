const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: String,
        amount: Number,
        razorpayOrderId: String,
        paymentId: String,

        status: {
            type: String,
            default: "CREATED"
        }
        ,

    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);