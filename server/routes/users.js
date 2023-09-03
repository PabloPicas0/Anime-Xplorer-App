const express = require("express");

const userModel = require("../models/User");
const registerUser = require("../controllers/users");
const deleteUser = require("../controllers/deleteUser")
const authUser = require("../middleware/authUser")

const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  check("username", "Username is required")
    .notEmpty()
    .custom(async (value) => {
      const userExists = await userModel.findOne({ username: value });

      if (userExists) {
        throw new Error("User already exists. Please check your username");
      } else {
        return value;
      }
    }),
  check("password", "Password is too short")
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
  check("email", "Invalid email adress").isEmail(),
  registerUser
);

router.delete("/", authUser, deleteUser)

module.exports = router;
