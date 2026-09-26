const express = require("express");

const router = express.Router();

const {
    createOrder,
    getAllOrders
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");


// Create order - only logged-in users
router.post(
    "/create",
    authMiddleware,
    createOrder
);


// Get orders - only logged-in user's orders
router.get(
    "/",
    authMiddleware,
    getAllOrders
);


module.exports = router;