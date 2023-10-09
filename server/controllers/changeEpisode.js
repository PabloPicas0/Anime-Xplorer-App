const userModel = require("../models/User");

const changeEpisode = async (req, res) => {
  const currentYear = new Date().toLocaleDateString("en-GB", { year: "numeric" });
  const currentMonth = new Date().toLocaleDateString("en-GB", {
    month: "short",
  });
  try {
    const { title, currentEpisode } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);

    const { animeList } = user;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
        animeList[i].currentEpisode = currentEpisode;
        user.metadata.monthWatchedEpisodes[currentYear][currentMonth] += 1;
        break;
      }
    }

    user.markModified("metadata.monthWatchedEpisodes");
    await user.save();

    return res.status(200).json({
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

module.exports = changeEpisode;
