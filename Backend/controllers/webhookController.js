const Order = require("../models/Order");

exports.handleWebhook = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        console.log("🔔 Webhook received:", orderId, status);

        res.json({ message: "Webhook processed successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};