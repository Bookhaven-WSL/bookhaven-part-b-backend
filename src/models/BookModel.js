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
    publishYear: {
        type: String
    },
    coverImage: {
        type: String,
        name: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger
        }
    },
    shelf: {
        type: String,
        enum: ['toBeRead', 'read', 'recommended'],
        default: 'toBeRead',
    },
    associatedEmail: {
        type: String,
        required: true,
        minLength: 10,
        trim: true,
        lowercase: true
    }
})

const Book = mongoose.model("Book", BookSchema)

module.exports = {
    Book
}