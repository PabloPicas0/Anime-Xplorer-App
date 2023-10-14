const userModel = require("../models/User");
const getDate = require("../utils/getDate");

const changeEpisode = async (req, res) => {
  const [currentYear, currentMonth] = getDate();

  try {
    const { title, currentEpisode } = req.body;
    const { userId } = req.user;

    const user = await userModel.findOne({ _id: userId });

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
    user.markModified("metadata.monthCompletedTitles"); // user schema has post hook that checks if we have new year and modifies this doc path
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
