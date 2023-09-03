const userModel = require("../models/User");

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findByIdAndDelete(userId)

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = deleteUser;
