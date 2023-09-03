const userModel = require("../models/User");

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findByIdAndDelete(userId)

  } catch (error) {

  }
};

module.exports = deleteUser;
