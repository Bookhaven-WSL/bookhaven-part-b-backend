const express = require("express")
const { Book } = require("../../models/BookModel")
const { getSingleApiEntry, getMultipleApiEntriesTitle, getMultipleApiEntriesGenre } = require("../../functions/APIrequest")
const router = express.Router()

router.post("/", async (request, response) => {
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

router.post ("/to-be-read", async (request, response) => {
    try {

        let key = request.body.key 

        const result = await getSingleApiEntry(key)

        const newBook = await Book.create({ olid: result[0][0].olid, title: result[0][1].title, authors: result[0][2].authors, genre: result[0][3].genres, publishYear: result[0][4].publishYear, coverImage: result[0][5].coverImage, shelf: "toBeRead"})
    
        return response.status(201).json ({
            success: true,
            data: newBook
        })
    } catch (error) {
        console.error("Error adding book", error);
        return response.status(501).json(error.message)
    }
})

router.post ("/read", async (request, response) => {
    try {

        let key = request.body.key 

        const result = await getSingleApiEntry(key)

        const newBook = await Book.create({ olid: result[0][0].olid, title: result[0][1].title, authors: result[0][2].authors, genre: result[0][3].genres, publishYear: result[0][4].publishYear, coverImage: result[0][5].coverImage, shelf: "read"})
    
        return response.status(201).json ({
            success: true,
            data: newBook
        })
    } catch (error) {
        console.error("Error adding book", error);
        return response.status(501).json(error.message)
    }
})

router.post ("/recommended", async (request, response) => {
    try {

        let genre = request.body.genre

        const result = await getMultipleApiEntriesGenre(genre)

        for (let books of result) {
            await Book.create({ olid: books[0].olid, title: books[1].title, authors: books[2].authors, genre: books[3].genres, publishYear: books[4].publishYear, coverImage: books[5].coverImage, shelf: "recommended"})
        }

        return response.status(201).json ({
            success: true,
            message: "Recommended books successfully added to database!"
        })
    } catch (error) {
        console.error("Error adding books", error);
        return response.status(501).json(error.message)
    }
})

router.post ("/search-new", async (request, response) => {
    try {

        let title = request.body.title

        const result = await getMultipleApiEntriesTitle(title)

        return response.json ({
            success: true,
            books: result
        })
    } catch (error) {
        console.error("Error displaying books", error);
        return response.status(501).json(error.message)
    }
})

router.post ("/search-personal", async (request, response) => {
    try {

        let title = request.body.title
        let shelf = request.body.shelf
        
        let result = await Book.findOne({title: title, shelf: shelf})

        if (!result) {
            response.status(400).json({
                message: "Sorry, it appears that book is not in your shelf."
            })
            return
        }

        return response.json({
            book: result
        })
    }
    catch (error) {
        console.error("Error finding book", error);
        return response.status(501).json(error.message)
    }
})

router.get ("/to-be-read", async (request, response) => {
    try { 

        let books = await Book.find({shelf:"toBeRead"});

        return response.json({ 
            books
        })
    }
    catch (error) {
        return response.status(500).json({
            message: error.message
        })
    }
})

router.get ("/read", async (request, response) => {
    try { 

        let books = await Book.find({shelf:"read"});

        return response.json({ 
            books
        })
    }
    catch (error) {
        return response.status(500).json({
            message: error.message
        })
    }
})

router.get ("/recommended", async (request, response) => {
    try { 
        let books = await Book.find({shelf:"recommended"});

        return response.json({ 
            books
        })
    }
    catch (error) {
        return response.status(500).json({
            message: error.message
        })
    }
})

router.patch("/update", async (request, response) => {
    try {
        let title = request.body.title
        let newRating = request.body.rating
        let newShelf = request.body.shelf
       
        if (!newRating || !newShelf) {
            response.status(400).json({
                message: "Please enter details to update books rating or shelf location."
            })
            return
        }

        let bookCheck = await Book.findOne({title: title})

        if (bookCheck === null) {
            response.status(400).json({
                message: "Sorry, it appears that book is not in your shelf."
            })
            return
        }

        let updatedBook = await Book.findOneAndUpdate({title: title}, {rating: newRating, shelf: newShelf})

        response.json({
            success: true,
            message: `${updatedBook.title} has been updated`
        })
    }
    catch (error) {
        response.status(501).json({
            message: error.message
        })
    }
})


router.delete("/", async (request, response) => {
    try{

        let title = request.body.title
        let authors = request.body.authors
        
        let result = await Book.findOne({title: title, authors: authors})

        if (result === null) {
        response.status(400).json({
            message: "Sorry, it appears that book is not in your shelf"
            })
        return
        }

        let book = await Book.deleteOne({title: title})

        response.status(200).json ({
            message: `Book has been removed from bookshelf.`
        })
    }
    catch (error) {
        return response.json({
            message: error.message
        })
    }
})

module.exports = router