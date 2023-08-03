const express = require("express");
const router = express.Router();

const { authLogin, loadUser } = require("../controllers/login");
const authUser = require("../middleware/authUser");

const { check } = require("express-validator");

router.get("/", authUser, loadUser);

router.post(
  "/",
  check("username", "Username is required").notEmpty(),
  check("password", "Please check your password").exists(),
  authLogin
);

module.exports = router;
