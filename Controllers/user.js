const Auth = require("../models/users");
const { v4: uuidv4 } = require("uuid")
const { getUser, setUser } = require("../Service/auth")


async function handleUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await Auth.create({
            user: name,
            email: email,
            password: password
        });

        return res.redirect("/", { user });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email, password })
        if (!user) {
            return res.status(400).json({ error: "ENTER VALID EMAIL/PASSWORD" });
        }
        const sessionId = uuidv4();//we gotta store this with user object
        setUser(sessionId, user)
        res.cookie("uid", sessionId)
        console.log("sessionId", sessionId)
        console.log("Generated session ID:", sessionId);
        console.log("User stored in memory:", getUser(sessionId));
        return res.redirect("/")
    } catch (err) {
        console.error("LoginError error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    handleUser, handleLogin
}