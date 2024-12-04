const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        name: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
    }
})

const Book = mongoose.model("Book", BookSchema)

module.exports = {
    Book
}