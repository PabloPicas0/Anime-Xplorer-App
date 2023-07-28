const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/login");

const { check } = require("express-validator");

router.post(
  "/",
  check("username", "Username is required").notEmpty(),
  check("password", "Please check your password").exists(),
  loginUser
);

module.exports = router;
