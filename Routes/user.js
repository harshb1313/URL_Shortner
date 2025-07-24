const express = require("express")
const router = express.Router()
const { handleUser,handleLogin } = require("../Controllers/user")

router.post("/", handleUser)
router.post("/login",handleLogin)

module.exports = router