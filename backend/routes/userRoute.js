const express = require("express");
const { registerUser, getAllUsers, loginUser, logout, forgotPassword, resetPassword } = require("../controllers/userController");

const router = express.Router();

//Register
router.route("/register").post(registerUser);

//Login Users
router.route("/login").post(loginUser);

// Forgot Password route
router.route("/password/forgot").post(forgotPassword);

// Reset Password
router.route("/password/reset/:token").put(resetPassword);

//Get all users (Admin)
router.route("/users").get(getAllUsers);

//Logging users out
router.route("/logout").get(logout);


module.exports = router