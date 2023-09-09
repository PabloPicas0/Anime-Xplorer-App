const express = require("express");
const router = express.Router();

const userModel = require("../models/User");

const { authLogin, loadUser, changePassword, sendRecover } = require("../controllers/login");
const authUser = require("../middleware/authUser");

const { check } = require("express-validator");

router.get("/", authUser, loadUser);

router.post(
  "/",
  check("username", "Username is required").notEmpty(),
  check("password", "Please check your password").exists(),
  authLogin
);

router.put(
  "/",
  check("password")
    .notEmpty()
    .withMessage("Please enter new password.")
    .isLength({ min: 6 })
    .withMessage("Password is too short.")
    .custom((password, { req }) => {
      if (password !== req.body.password2) {
        throw new Error("Passwords don't match");
      } else {
        return password;
      }
    }),
  changePassword
);

router.put(
  "/recover",
  check("email").custom(async (email) => {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      throw new Error("Incorrect email");
    }
  }),
  sendRecover
);

module.exports = router;
