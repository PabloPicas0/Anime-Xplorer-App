const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const userModel = require("../models/User");

const jwt = require("jsonwebtoken");

const loadUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findById(userId);

    return res.status(200).json({
      error: false,
      status: [{ msg: "" }],
      isAuthenticated: true,
      profile: {
        username: user.username,
        date: user.accountCreated,
        options: user.accountSettings,
        list: user.animeList,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Server error. Please try again." }],
      isAuthenticated: false,
      profile: {
        username: "",
        date: 0,
        options: [],
        list: [],
      },
    });
  }
};

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

    if (!user) {
      return res.status(400).json({
        error: true,
        status: [{ msg: "Invalid username" }],
      });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return res.status(400).json({
        error: true,
        status: [{ msg: "Invalid password" }],
      });
    }

    const payload = {
      userId: user.id,
    };

    jwt.sign(payload, process.env.KEY, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.status(400).json({
          error: true,
          status: [{ msg: "Token error. Please try again." }],
        });
      }

      return res.status(200).json({
        error: false,
        status: [{ msg: "" }],
        token: token,
        profile: {
          username: user.username,
          date: user.accountCreated,
          options: user.accountSettings,
          list: user.animeList,
        },
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Server error. Please try again later" }],
    });
  }
};

const changePassword = async (req, res) => {
  const { userId, password } = req.body;
  const errors = validationResult(req);

  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ redirect: true });
  
  if (!errors.isEmpty()) return res.status(400).json({ error: true, status: errors.array() });


  try {
    const user = await userModel.findById(userId);

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authLogin, loadUser, changePassword };
