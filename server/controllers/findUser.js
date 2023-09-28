const userModel = require("../models/User");

const findUser = async (req, res) => {
  const { user } = req.body;

  try {
    const searchUser = await userModel.findOne({ username: user });
    console.log(user, searchUser);
    return res.json({ users: searchUser?.username, error: false, status: [{ msg: "" }] });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later" }],
    });
  }
};

module.exports = findUser;
