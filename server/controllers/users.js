const {validationResult} = require("express-validator")

const userModel = require("../models/User");

const registerUser = async (req, res) => {
  const errors = validationResult(req)
  
  if(errors) {
    return res.status(400).json({
      error: true,
      status: "They are errors"
    })
  }
  const { email, username, password } = req.body;

  try {
    const user = new userModel({
      email: email,
      username: username,
      password: password,
    });

    await user.save();

    return res.status(200).json({
      error: false,
      status: "Account Created",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: "Server error. Please try again later",
    });
  }
};

module.exports = registerUser;
