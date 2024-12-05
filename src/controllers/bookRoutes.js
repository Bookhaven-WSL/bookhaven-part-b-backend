const express = require("express")
const { Book } = require("../models/BookModel")
const router = express.Router()


router.post("/test-book", async (request, response) => {
    let id = "testExternalId"
    let title = request.body.title
    let authors = request.body.authors
    let genre = request.body.genre
    let description = request.body.description
    let publishedDate = Date.now
    let rating = request.body.rating

    let testBook = await Book.create({ id: id, title: title, authors: authors, genre: genre, description: description, publishedDate: publishedDate, rating: rating})

    response.json({
        book: {
            id: testBook.id,
            title: testBook.title,
            authors: testBook.authors,
            genre: testBook.genre,
            description: testBook.description,
            publishedDate: publishedDate,
            rating: testBook.rating
        }
    })
})

module.exports = router