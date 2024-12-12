const express = require("express")
const { Book } = require("../../models/BookModel")
const { getSingleApiEntry, getMultipleApiEntries } = require("../../functions/APIrequest")
const router = express.Router()


router.post("/books", async (request, response) => {
    try {
        let olid = request.body.olid
        let title = request.body.title
        let authors = request.body.authors
        let genre = request.body.genre
        let publishYear = request.body.publishYear
        let rating = request.body.rating
        let shelf = request.body.shelf

        if (!title || !authors) {
            response.status(400).json({
                message: "Sorry, looks like you are missing title or author details."
            })
            return
        }

        let bookCheck = await Book.exists({olid: olid, title: title, authors: authors, shelf: shelf})

        if (bookCheck) {
            response.status(400).json({
                message: "This book is already in your bookshelf "
            })
            return
        }

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
    }
    catch (error) {
        response.json({
            message: error.message
        })
    }
})

router.post ("/books/to-be-read", async (request, response) => {
    try {
        const result = await getSingleApiEntry() 

        const newBook = await Book.create(result)
    
        return response.status(201).json ({
            success: true,
            data: newBook
        })
    } catch (error) {
        console.error("Error adding book", error);
        return response.status(501).json(error)
    }
})

router.post ("/books/read", async (request, response) => {
    try {
        const result = await getSingleApiEntry() 

        const newBook = await Book.create(result)
    
        return response.status(201).json ({
            success: true,
            data: newBook
        })
    } catch (error) {
        console.error("Error adding book", error);
        return response.status(501).json(error)
    }
})

router.post ("/books/recommended", async (request, response) => {
    try {
        const result = await getMultipleApiEntries() 

        const recBooks = await Book.create({result})
    
        return response.status(201).json ({
            success: true,
            data: recBooks
        })
    } catch (error) {
        console.error("Error adding books", error);
        return response.status(501).json(error)
    }
})

router.get ("/books/to-be-read", async (request, respond) => {


})

router.get ("/books/read", async (request, respond) => {


})

router.get ("/books/recommended", async (request, respond) => {


})



module.exports = router