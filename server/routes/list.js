const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const addToUserList = require("../controllers/list");
const { sendToUser, findScore, findDate, findType, findTitle } = require("../controllers/filterUserList");
const authUser = require("../middleware/authUser");
const changeEpisode = require("../controllers/changeEpisode");
const editList = require("../controllers/editList");
const deleteEntry = require("../controllers/deleteEntry");
const sendStatistics = require("../controllers/sendStatistics");

const userModel = require("../models/User");

router.post(
  "/",
  check("title", "Title is required").notEmpty(),
  check("allEp", "All episodes is required").not().equals("0").isNumeric(),
  authUser,
  check("Authorization").custom(async (token, { req }) => {
    const user = await userModel.findById(req.user.userId);

    const { animeList } = user;
    const { title } = req.body;

    const titleExists = animeList.some((anime) => {
      const { animeName } = anime;

      return animeName === title;
    });

    if (titleExists) {
      throw new Error("This anime is already in your list.");
    }
  }),
  addToUserList
);
// WARNING //
// Find Score controller needs to be first because he adds list to filter to req object //
// Moving it without edit may cause a bugs //
router.put("/", authUser, findScore, findDate, findType, findTitle, sendToUser);

router.put("/episodes", authUser, changeEpisode);
router.put("/edit", authUser, editList);
router.delete("/delete", authUser, deleteEntry);
router.put("/statistics", authUser, sendStatistics);

module.exports = router;
