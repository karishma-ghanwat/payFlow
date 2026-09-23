const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            message: "User created",
            user
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            token,
            user
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
    try {

        // Get logged-in user's ID from JWT
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};