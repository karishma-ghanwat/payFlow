const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../models/Order");

// ✅ Verify Razorpay payment
router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // 🔐 create signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");

        // 🔍 find order in DB
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // ✅ SUCCESS or ❌ FAILED
        if (expectedSignature === razorpay_signature) {
            order.status = "SUCCESS";
        } else {
            order.status = "FAILED";
        }

        // save payment id
        order.paymentId = razorpay_payment_id;

        await order.save();

        res.json({
            success: expectedSignature === razorpay_signature,
            order
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;