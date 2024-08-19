const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  loadUser,
} = require("../Controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/me").get(loadUser);

module.exports = router;
