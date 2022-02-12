const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Get all products
router.route("/products").get(getAllProducts);

//Admin: Add new products
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//Admin: CRUD on specific products
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)        // Update a specific product
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);    // Delete a specific product

// Get a specific product
router.route("/product/:id").get(getProductDetails);

// Create or update review
router.route("/review").put(isAuthenticatedUser, createProductReview)

// Get all reviews
router.route("/reviews").get(getProductReview);

// Delete a review
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router