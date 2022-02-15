const express = require("express");
const { newOrder, myOrders, getSingleOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Create an order
router.route("/order/new").post(isAuthenticatedUser, newOrder)

// Get an orders
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// Get a user orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders)

module.exports = router;