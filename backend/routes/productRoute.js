const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Get all products
router.route("/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

//Add new products
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//CRUD on specific products
router.route("/product/:id")
    .get(getProductDetails)                         // Get  a  specific  product
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)        // Update a specific product
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);    // Delete a specific product

module.exports = router