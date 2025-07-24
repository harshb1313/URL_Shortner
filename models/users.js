const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})



const Auth = mongoose.model("auth", userSchema)

module.exports = Auth;