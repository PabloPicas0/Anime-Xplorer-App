const express = require("express");

const router = express.Router();

const addToUserList = require("../controllers/addToList");

router.post("/", addToUserList);

module.exports = router;
