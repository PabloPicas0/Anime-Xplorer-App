const express = require("express")
const router = express.Router()

const userModel = require("../models/User")
const loginUser = require("../controllers/login")


router.post("/", loginUser)

module.exports = router