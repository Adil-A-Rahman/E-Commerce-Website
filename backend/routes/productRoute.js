const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
//const { create } = require("../models/productModel");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/product/new").post(isAuthenticatedUser, createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/product/:id").delete(deleteProduct);

module.exports = router