const express = require("express")
const {handleGenerateNewShortUrl,handleAnalytics} = require("../Controllers/url")
const router = express.Router()

router.post("/", handleGenerateNewShortUrl) //your path is http://localhost:8000/url

router.get("/analytics/:shortId",handleAnalytics)

module.exports=router