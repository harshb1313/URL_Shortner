const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
password:{
    type:String
}
})



const Auth = mongoose.model("auth", userSchema)

module.exports = Auth;