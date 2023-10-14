const userModel = require("../models/User");
const getDate = require("../utils/getDate");

const editList = async (req, res) => {
  const [currentYear, currentMonth] = getDate();

  try {
    const { title, currentEpisode, score, animeType, animeStatus } = req.body;
    const { userId } = req.user;

    const user = await userModel.findOne({ _id: userId });
    const { animeList } = user;

    if (animeStatus === "Completed") user.metadata.monthCompletedTitles[currentYear][currentMonth] += 1;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
        if (animeList[i].currentEpisode < currentEpisode) {
          const difference = currentEpisode - animeList[i].currentEpisode;

          user.metadata.monthWatchedEpisodes[currentYear][currentMonth] += difference;
        } else {
          const difference = animeList[i].currentEpisode - currentEpisode;

          user.metadata.monthWatchedEpisodes[currentYear][currentMonth] -= difference;
        }
        animeList[i].currentEpisode = currentEpisode;
        animeList[i].score = score;
        animeList[i].animeType = animeType;
        animeList[i].animeStatus = animeStatus;
        animeList[i].endWatching === 0 && animeStatus === "Completed"
          ? (animeList[i].endWatching = new Date().getTime())
          : null;
        break;
      }
    }

    user.markModified("metadata.monthWatchedEpisodes");
    user.markModified("metadata.monthCompletedTitles");
    await user.save();

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
      list: {
        title,
        currentEpisode: Number(currentEpisode),
        score: Number(score),
        animeType,
        animeStatus,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = editList;
