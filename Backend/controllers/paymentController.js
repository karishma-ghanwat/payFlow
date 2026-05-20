const Order = require("../models/Order");
const axios = require("axios");
const crypto = require("crypto");

// ✅ 1. OLD SIMULATION PAYMENT (KEEP THIS)
exports.processPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const isSuccess = Math.random() > 0.3;

        order.status = isSuccess ? "SUCCESS" : "FAILED";
        order.paymentId = "pay_" + Date.now();

        await order.save();

        // 🔔 Webhook call (optional)
        await axios.post("http://localhost:5000/api/webhook/payment-status", {
            orderId: order.orderId,
            status: order.status
        });

        res.json({
            success: isSuccess,
            message: isSuccess ? "Payment Successful" : "Payment Failed",
            order
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ 2. REAL RAZORPAY VERIFY (IMPORTANT)
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }

        // ✅ OPTIONAL: Update DB after successful payment
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (order) {
            order.status = "SUCCESS";
            order.paymentId = razorpay_payment_id;
            await order.save();
        }

        res.json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};