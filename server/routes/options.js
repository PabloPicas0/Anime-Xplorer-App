const express = require("express");
const router = express.Router();

const options = require("../controllers/options");
const authUser = require("../middleware/authUser");

router.post("/", authUser, options);

module.exports = router;
