const express = require("express")
const { BookModel } = require("../models/BookModel")
const router = express.Router()


router.post("/test-book", async (request, response) => {
    let key = "testExternalId"
    let title = request.body.title
    let authors = request.body.authors
    let genre = request.body.genre
    let publishYear = Date.now
    let rating = request.body.rating
    let shelf = shelf

    let testBook = await BookModel.create({ key: key, title: title, authors: authors, genre: genre, publishYear: publishYear, rating: rating, shelf, shelf})

    response.json({
        book: {
            key: testBook.id,
            title: testBook.title,
            authors: testBook.authors,
            genre: testBook.genre,
            publishYear: publishYear,
            rating: testBook.rating,
            shelf: shelf

        }
    })
})

module.exports = router