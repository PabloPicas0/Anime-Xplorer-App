const express = require("express")
const router = express.Router()

const options = require("../controllers/options")

router.post("/", options)

module.exports = router