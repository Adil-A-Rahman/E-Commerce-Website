const express = require("express");
const { registerUser, getAllUsers, loginUser, logout } = require("../controllers/userController");

const router = express.Router();

//Register
router.route("/register").post(registerUser);

//Login Users
router.route("/login").post(loginUser);

//Get all users (Admin)
router.route("/users").get(getAllUsers);

//Logging users out
router.route("/logout").get(logout);




// router.route("/product/:id").get(getProductDetails);



// router.route("/product/:id").put(updateProduct);

// router.route("/product/:id").delete(deleteProduct);

module.exports = router