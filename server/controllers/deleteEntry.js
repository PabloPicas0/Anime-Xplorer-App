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

    console.log(user);
  } catch (error) {
    console.error(error)
  }
};

module.exports = deleteEntry;
