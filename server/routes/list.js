const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const addToUserList = require("../controllers/addToList");
const authUser = require("../middleware/authUser");

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

module.exports = router;
