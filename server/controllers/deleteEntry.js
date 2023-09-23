const userModel = require("../models/User");

const deleteEntry = async (req, res) => {
  const { userId } = req.user;
  const { title } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { animeList: { animeName: title } } },
      { new: true }
    );

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = deleteEntry;
