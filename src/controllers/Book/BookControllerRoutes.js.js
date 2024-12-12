const express = require("express")
const { Book } = require("../../models/BookModel")
const router = express.Router()


router.post("/book", async (request, response) => {
    let olid = olid
    let title = request.body.title
    let authors = request.body.authors
    let genre = request.body.genre
    let publishYear = request.body.publishYear
    let rating = request.body.rating
    let shelf = shelf

    let newBook = await Book.create({ olid: olid, title: title, authors: authors, genre: genre, publishYear: publishYear, rating: rating, shelf: shelf})



    response.json({
        book: {
            olid: newBook.olid,
            title: newBook.title,
            authors: newBook.authors,
            genre: newBook.genre,
            publishYear: publishYear,
            rating: newBook.rating,
            shelf: shelf

        }
    })
})

module.exports = router