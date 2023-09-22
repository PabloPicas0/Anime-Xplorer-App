const userModel = require("../models/User");

const findScore = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

const findDate = (req, res, next) => {
  const startDate = Number(req.body.startWatching);
  const endDate = Number(req.body.endWatching);
  const animeList = req.list;

  if (startDate === 0 && endDate === 0) next();

  if (startDate > endDate && endDate !== 0) {
    return res.status(400).json({
      error: true,
      status: [{ msg: "Invalid date range." }],
    });
  }

  const newList = animeList.filter((anime) => {
    if (startDate !== 0 && endDate === 0) {
      return startDate <= anime.startWatching;
    }
    if (startDate === 0 && endDate !== 0) {
      return endDate >= anime.endWatching;
    }
    if (startDate !== 0 && endDate !== 0) {
      return startDate <= anime.startWatching && endDate >= anime.endWatching;
    }
  });

  req.list = newList;

  next();
};

const findType = (req, res, next) => {
  const { animeType } = req.body;
  const animeList = req.list;

  if (animeType === "") next();

  const newList = animeList.filter((anime) => anime.animeType === animeType);

  req.list = newList;

  next();
};

const findTitle = (req, res, next) => {
  const { animeName } = req.body;
  const animeList = req.list;

  if (animeName === "") next();

  const newList = animeList.filter((anime) =>
    anime.animeName.toLowerCase().includes(animeName.toLowerCase())
  );

  req.list = newList;

  next();
};

const sendToUser = (req, res) => {
  const filteredList = req.list;

  return res.status(200).json({
    error: false,
    status: [{ msg: "" }],
    list: filteredList,
  });
};

module.exports = { sendToUser, findScore, findDate, findType, findTitle };
