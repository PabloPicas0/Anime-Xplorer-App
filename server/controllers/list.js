const userModel = require("../models/User");

const { validationResult } = require("express-validator");

const addToUserList = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      status: errors.array(),
    });
  }

  const { username, type, title, status, currentEp, allEp, score } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    const newTitle = {
      animeType: type,
      animeName: title,
      animeStatus: status,
      currentEpisode: currentEp,
      allEpisodes: allEp,
      startWatching: new Date().getTime(),
      endWatching: 0,
      score: Number(score),
    };

    user.animeList.push(newTitle);

    await user.save();

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
      list: newTitle,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = addToUserList;
