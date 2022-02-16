const express = require("express");
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Create an order
router.route("/order/new").post(isAuthenticatedUser, newOrder)

// Get an orders
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// Get a user's orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Admin: Get all orders
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Admin: Update an order
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateOrder);

// Admin: Delete an order
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteOrder);


module.exports = router;