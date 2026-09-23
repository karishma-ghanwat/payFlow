const express = require("express");

const {
    signup,
    login,
    getProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ================= AUTH ROUTES =================

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);


// ================= PROFILE ROUTE =================

// Get currently logged-in user's profile
router.get(
    "/profile",
    authMiddleware,
    getProfile
);


module.exports = router;