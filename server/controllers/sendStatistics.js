const userModel = require("../models/User");

const sendStatistics = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    return res.status(200).json({
      error: false,
      status: [{ msg: "OK" }],
      monthCompletedTitles: user.metadata.monthCompletedTitles,
      monthWatchedEpisodes: user.metadata.monthWatchedEpisodes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: true,
      status: [{ mag: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = sendStatistics;
