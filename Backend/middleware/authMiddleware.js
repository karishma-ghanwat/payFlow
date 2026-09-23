const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token, access denied"
            });
        }

        // Expected format:
        // Authorization: Bearer TOKEN
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        // Verify JWT
        const decoded = jwt.verify(token, "secretkey");

        // Store decoded user information
        req.user = decoded;

        next();

    } catch (err) {

        res.status(401).json({
            message: "Invalid token"
        });

    }
};