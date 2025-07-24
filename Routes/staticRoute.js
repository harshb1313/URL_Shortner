const express = require("express")
const router = express.Router()
URL = require("../models/url")


router.get("/",async(req,res)=>{
  if(!req.user) return res.redirect("/login")
  const allUrls = await URL.find({ createdBy: req.user._id })
  return res.render("Home",{urls: allUrls})
})

router.get("/signup", async(req,res)=>{
  return res.render("Signup")
})

router.get("/login", async(req,res)=>{
  return res.render("login")
})

module.exports = router