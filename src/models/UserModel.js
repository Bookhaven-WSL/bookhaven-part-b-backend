const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = {
    User
}