const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Admin: Get all products
router.route("/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

//Admin: Add new products
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//Admin: CRUD on specific products
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)        // Update a specific product
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);    // Delete a specific product

// Non-admin: Get a specific product
router.route("/product/:id").get(getProductDetails);

module.exports = router