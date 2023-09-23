const userModel = require("../models/User");

const editList = async (req, res) => {
  try {
    const { title, currentEpisode, score, animeType, animeStatus } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    const { animeList } = user;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
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
