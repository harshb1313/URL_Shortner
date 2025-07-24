const { getUser } = require("../Service/auth")

async function restrictToLoggedInUsersOnly(req, res, next) {
    // console.log(req)
    const useruid = req.cookies?.uid;
    console.log("Received cookie uid:", req.cookies.uid);
    console.log("Session user found:", getUser(req.cookies.uid));

    if (!useruid) return res.redirect("/login")
    const user = getUser(useruid)
    if (!user) return res.redirect("/login")
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    console.log(req)
    const useruid = req.cookies?.uid;

    const user = getUser(useruid)

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth
}