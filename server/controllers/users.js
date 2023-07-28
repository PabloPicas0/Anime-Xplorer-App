const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const userModel = require("../models/User");

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      status: errors.array(),
    });
  }
  const { email, username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({
      error: false,
      status: [{ msg: "Account Created" }],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Server error. Please try again later" }],
    });
  }
};

module.exports = registerUser;
