const { validationResult } = require("express-validator");

const userModel = require("../models/User");

const authLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      status: errors.array(),
    });
  }

  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username: username });
    const isPasswordMatching = password === user.password;

    if (!user || !isPasswordMatching) {
      return res.status(400).json({
        error: true,
        status: [{ msg: "Invalid username or password" }],
      });
    }

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Server error. Please try again later" }],
    });
  }
};

module.exports = authLogin;
