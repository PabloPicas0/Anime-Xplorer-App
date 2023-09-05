const express = require("express");
const router = express.Router();

const { authLogin, loadUser, changePassword } = require("../controllers/login");
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
    .custom(async (password, { req }) => {
      if (password !== req.body.password2) {
        throw new Error("Passwords don't match");
      } else {
        return password;
      }
    }),
  changePassword
);

module.exports = router;
