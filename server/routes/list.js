const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const addToUserList = require("../controllers/addToList");

router.post(
  "/",
  check("title", "Title is required").notEmpty(),
  check("allEp", "Add number of episodes").notEmpty().isNumeric(),
  addToUserList
);

module.exports = router;
