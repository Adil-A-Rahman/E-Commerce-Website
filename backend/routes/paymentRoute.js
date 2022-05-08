const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

//Open request
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Get API key
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;