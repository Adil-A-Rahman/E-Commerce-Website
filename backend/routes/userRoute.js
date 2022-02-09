const express = require("express");
const { registerUser, getAllUsers, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

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

// Get User details
router.route("/me").get(isAuthenticatedUser, getUserDetails)

// Update Password 
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

// Update user profile info
router.route("/me/update").put(isAuthenticatedUser, updateProfile)

module.exports = router