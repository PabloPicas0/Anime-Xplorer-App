const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const addToUserList = require("../controllers/addToList");

router.post(
  "/",
  check("title", "Title is required").notEmpty(),
  check("allEp", "All episodes is required").not().equals("0").isNumeric(),
  addToUserList
);

module.exports = router;
