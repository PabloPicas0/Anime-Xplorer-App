const userModel = require("../models/User");

const changeEpisode = async (req, res) => {
  try {
    const { title, currentEpisode } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);

    const { animeList } = user;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
        animeList[i].currentEpisode = currentEpisode;
        break;
      }
    }

    await user.save();

    return res.status(200).json({
      msg: "List updated",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = changeEpisode;
