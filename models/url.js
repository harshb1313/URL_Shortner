const mongoose = require("mongoose");
const { applyTimestamps } = require("./users");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
    },
    redirectedURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true })

const URL = mongoose.model("url", urlSchema);





module.exports = URL