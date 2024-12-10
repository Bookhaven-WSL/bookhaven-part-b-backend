const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    olid: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: {
        type: [String],
        required: true,
        trim: true
        },
    genre: {
        type: [String],
        },
    // description: {
    //     type: String,
    // },
    publishYear: {
        type: String
    },
    coverImage: {
        type: String,
        name: String,
        // required: true,
        // unique: true
    },
    rating: {
        type: Number,
    },
    shelf: {
        type: String,
        enum: ['toBeRead', 'read', 'recommended'],
        default: 'toBeRead',
    }
})

const BookModel = mongoose.model("Book", BookSchema)

module.exports = {
    BookModel
}