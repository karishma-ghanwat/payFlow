const express = require("express");
const router = express.Router();

const { handleWebhook } = require("../controllers/webhookController");

router.post("/payment-status", handleWebhook);

module.exports = router;