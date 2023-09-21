const userModel = require("../models/User");

const checkScore = async (req, res, next) => {
  const minScore = Number(req.body.minScore);
  const maxScore = Number(req.body.maxScore);
  const { userId } = req.user;

  const user = await userModel.findById(userId);
  const { animeList } = user;

  req.list = [...animeList];

  if (minScore === 0 && maxScore === 0) next();

  const newList = animeList.filter((anime) => minScore <= anime.score && maxScore >= anime.score);

  req.list = newList;

  next();
};

const checkDate = (req, res, next) => {
  const startDate = Number(req.body.startWatching);
  const endDate = Number(req.body.endWatching);

  if (startDate === 0 && endDate === 0) next();

  if (startDate > endDate && endDate !== 0) {
    return res.status(400).json({
      error: true,
      status: [{ msg: "Invalid date range." }],
    });
  }

  console.log(req.list);
};
// TODO: Add error handling //
const filterUserList = async (req, res) => {
  try {
    const { animeType, animeName,  } = req.body;
    const { userId } = req.user;

  } catch (error) {
    console.log(error);
  }
};

module.exports = { filterUserList, checkScore, checkDate };
