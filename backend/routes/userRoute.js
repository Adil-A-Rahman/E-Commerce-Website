const express = require("express");
const { is } = require("express/lib/request");
const { registerUser, getAllUsers, getSingleUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, updateUserRole, deleteUser } = require("../controllers/userController");
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

//Logging users out
router.route("/logout").get(logout);

// Get User details
router.route("/me").get(isAuthenticatedUser, getUserDetails)

// Update Password 
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

// Update user profile info
router.route("/me/update").put(isAuthenticatedUser, updateProfile)

//Admin: Get all users
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Admin: Get a user, Update role, Delete user
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)           //Admin: Get single user
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)          // Admin: Update user Role
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);          // Admin: Delete user

module.exports = router