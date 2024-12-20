const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
        trim: true,
        lowercase: true
    },
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
    },
    isChild: {
        type: Boolean,
        default: false
    },
    bookshelves: {
        read: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
            }
        ],
        toBeRead: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
            }
        ],
        recommended: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
            }
        ],
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = {
    User
}