const express = require("express");

const router = express.Router()

//const register = require("../controllers/auth.js")

const authController = require("../controllers/auth.js")

router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router

