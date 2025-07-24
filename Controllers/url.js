const {nanoid} = require("nanoid")
const URL = require("../models/url")


async function handleGenerateNewShortUrl(req, res) {
    try {
        console.log("BODY:", req.body);
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: "pass url" });
        const shorturl = nanoid(8);
        await URL.create({
            shortId: shorturl,
            redirectedURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        return res.render("Home",{id: shorturl})
    } catch (err) {
        console.error("Error saving URL:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function handleAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory

    })
}

module.exports={
    handleGenerateNewShortUrl,
    handleAnalytics
}