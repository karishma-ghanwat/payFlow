const Order = require("../models/Order");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required"
            });
        }

        // ✅ Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // paisa
            currency: "INR",
        });

        // ✅ Save in DB
        const order = new Order({
            orderId: "order_" + Date.now(),
            amount,
            razorpayOrderId: razorpayOrder.id,
            status: "CREATED"
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
            razorpayOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
