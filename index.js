const express = require("express");
const app = express();
const PORT = 8000;
const { connectMongoDb } = require("./connects");
const URL = require("./models/url")
const path = require("path")
const cookieparser = require("cookie-parser")
const {restrictToLoggedInUsersOnly,checkAuth} = require("./Middleware/auth")

app.set("view engine", "ejs") //CREATE THE VIEW FOR US 
app.set("views", path.resolve("./view"))



//CONNECTION
connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("connected and working"))
  .catch(err => console.log("err", err));

//ROUTES
const urlroute = require("./Routes/url");  
const staticRoute = require("./Routes/staticRoute");
const userRoute = require("./Routes/user")

//MIDDLEWARES
app.use(express.json()); // <--- THIS LINE, with parentheses, BEFORE routes!
app.use(express.urlencoded({ extended: true })); 
app.use(cookieparser())


//ROUTES CALLING 
app.use("/url", restrictToLoggedInUsersOnly ,urlroute);//this is base path http://localhost:8000/url
app.use("/", checkAuth ,staticRoute); //this is base path http://localhost:8000/render/html
app.use("/user", userRoute);//IF ANY REQUEST STARTS WITH /USER THEN FORWARD IT TO THIS ROUTE


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() }
      }
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectedURL);
});


app.listen(PORT, () => console.log(`Server Running At ${PORT}`));


