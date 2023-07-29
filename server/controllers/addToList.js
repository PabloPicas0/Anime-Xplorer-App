const userModel = require("../models/User");

const addToUserList = async (req, res) => {
  const { username, type, title, status, currentEp, allEp, score } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    user.animeList.push({
      animeType: type,
      animeName: title,
      animeStatus: status,
      currentEpisode: currentEp,
      allEpisodes: allEp,
      score: score,
    });

    await user.save();

    res.status(200).json({
      profile: {
        userneme: user.username,
        date: user.accountCreated,
        options: user.accountSettings,
        list: user.animeList,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = addToUserList;
