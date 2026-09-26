const Order = require("../models/Order");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


// ================= CREATE ORDER =================

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required"
            });
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
        });

        // Save order in database
        const order = new Order({
            // Store logged-in user's ID
            userId: req.user.id,

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


// ================= GET USER ORDERS =================

exports.getAllOrders = async (req, res) => {
    try {

        // Get only orders belonging to logged-in user
        const orders = await Order.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};