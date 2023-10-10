const userModel = require("../models/User");
const getDate = require("../utils/getDate");

// TODO: current version of saving monthly wathed episodes dont support multiple years which may cause bugs in future
const changeEpisode = async (req, res) => {
  const [currentYear, currentMonth] = getDate();
  try {
    const { title, currentEpisode } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);

    const { animeList } = user;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
        if (animeList[i].currentEpisode < currentEpisode) {
          user.metadata.monthWatchedEpisodes[currentYear][currentMonth] += 1;
        } else {
          user.metadata.monthWatchedEpisodes[currentYear][currentMonth] -= 1;
        }
        animeList[i].currentEpisode = currentEpisode;
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
