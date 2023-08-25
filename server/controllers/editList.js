const userModel = require("../models/User");

const editList = async (req, res) => {
  try {
    const { title, allEpisodes, currentEpisode, score, animeType, animeStatus } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    const { animeList } = user;

    for (let i = 0; i < animeList.length; i++) {
      const { animeName } = animeList[i];

      if (animeName === title) {
        animeList[i].currentEpisode = currentEpisode
        animeList[i].score = score
        animeList[i].animeType = animeType
        animeList[i].animeStatus = animeStatus
        console.log(animeList[i])
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = editList;
