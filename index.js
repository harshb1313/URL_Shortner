const express = require("express");
const app = express();
const PORT = 8000;
const { connectMongoDb } = require("./connects");
const urlroute = require("./Routes/url");
const URL = require("./models/url")

connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("connected and working"))
  .catch(err => console.log("err", err));

app.use(express.json()); // <--- THIS LINE, with parentheses, BEFORE routes!
app.use("/url", urlroute);//this is base path http://localhost:8000/url

app.get("/:shortId",async(req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {shortId},
    {$push:{
      visitHistory : {timestamp:Date.now()}
    }
  })
  res.redirect(entry.redirectedURL) 
})



app.listen(PORT, () => console.log(`Server Running At ${PORT}`));


