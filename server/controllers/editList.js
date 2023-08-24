const userModel = require("../models/User");

const editList = async (req, res) => {
  try {
    const { title, allEpisodes, currentEpisode, score, animeType, animeStatus } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    const list = user.animeList;

    for (let i = 0; i < list.length; i++) {
      const { animeName } = list[i];

      if (animeName === title) {

      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = editList
