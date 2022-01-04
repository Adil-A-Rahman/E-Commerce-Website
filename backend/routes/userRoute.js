const express = require("express");
const { registerUser, getAllUsers, loginUser } = require("../controllers/userController");

const router = express.Router();

//Register
router.route("/register").post(registerUser);

//Login Users
router.route("/login").post(loginUser);

//Get all users
router.route("/users").get(getAllUsers);






// router.route("/product/:id").get(getProductDetails);



// router.route("/product/:id").put(updateProduct);

// router.route("/product/:id").delete(deleteProduct);

module.exports = router