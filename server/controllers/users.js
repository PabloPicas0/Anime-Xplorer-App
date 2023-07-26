const userModel = require("../models/User");

const registerUser = async (req, res) => {
  const { email, username, password, password2 } = req.body;

  try {
    const userExists = await userModel.findOne({ username: username });
    const isPasswordCorrect = password === password2;

    if (userExists) {
      return res.status(400).json({
        error: true,
        status: "User already exists. Please check your username",
      });
    }

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: true,
        status: "Incorrect password",
      });
    }

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
