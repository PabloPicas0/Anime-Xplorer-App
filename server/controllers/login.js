const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const userModel = require("../models/User");

const jwt = require("jsonwebtoken");

const loadUser = async (req, res) => {
  const { userId } = req.user;
  const { username } = req.body;

  const usernameExists = username != "undefined";
  let nextUserList = null;

  try {
    const user = await userModel.findById(userId);

    if (usernameExists) {
      const nextUser = await userModel.findOne({ username: username });
      nextUserList = nextUser.animeList;
    }

    return res.status(200).json({
      error: false,
      status: [{ msg: "" }],
      isAuthenticated: true,
      profile: {
        username: user.username,
        date: user.accountCreated,
        options: user.accountSettings,
        list: nextUserList || user.animeList,
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

    jwt.sign(
      payload,
      process.env.KEY,
      { expiresIn: user.accountSettings[0].keepLogined ? "7d" : "1h" },
      (err, token) => {
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
      }
    );
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

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({
      redirect: true,
      error: false,
      status: [{ msg: "" }],
    });

  if (!errors.isEmpty())
    return res.status(400).json({
      error: true,
      status: errors.array(),
    });

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        redirect: true,
        error: false,
        status: [{ msg: "" }],
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      redirect: true,
      error: false,
      status: [{ msg: "OK" }],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

const sendRecover = async (req, res) => {
  const { email, username } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      status: errors.array(),
    });
  }

  try {
    const user = await userModel.findOne({ email: email });

    console.log(user.id);

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
      id: user.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = { authLogin, loadUser, changePassword, sendRecover };
