const userModel = require("../models/User");

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userExists = await userModel.findOne({ username: username });

    if (userExists) {
      return res.status(400).json({
        error: "User already Exists. Please check your username",
      });
    }

    const user = new userModel({
      email: email,
      username: username,
      password: password,
    });

    await user.save();

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = registerUser;
