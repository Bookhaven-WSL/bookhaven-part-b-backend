const express = require("express")
const { Book } = require("../../models/BookModel")
const { getSingleApiEntry, getMultipleApiEntries } = require("../../functions/APIrequest")
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

router.post ("/read", async (request, response) => {
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

router.post ("/recommended", async (request, response) => {
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

router.get ("/search", async (request, response) => {

    let title = request.body.title
    let authors = request.body.authors
    let genre = request.body.genre
    let publishYear = request.body.publishYear
    
    let result = await Book.findOne({title: title, authors: authors, genre: genre, publishYear: publishYear})

    if (!result) {
        response.status(400).json({
            message: "Sorry, it appears that book is not in your shelf."
        })
        return
    }

    response.json

})

router.get ("/to-be-read", async (request, response) => {
    try{ 
        let books = await Book.find({shelf:"toBeRead"});

        response.json({ books })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
})

router.get ("/read", async (request, response) => {
    try{ 
        let books = await Book.find({shelf:"read"});

        response.json({ books })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
})

router.get ("/recommended", async (request, response) => {
    try{ 
        let books = await Book.find({shelf:"recommended"});

        response.json({ books })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }

})


router.patch("/update", async (request, response) => {
    try {
        let title = request.body.title
        let authors = request.body.authors
        let newRating = request.body.rating
        let newShelf = request.body.shelf
       
        if (!newRating || !newShelf) {
            response.status(400).json({
                message: "Please enter details to update books rating or shelf location."
            })
            return
        }

        let bookCheck = await Book.findOne({title: title, authors: authors}).exec()

        if (bookCheck === null) {
            response.status(400).json({
                message: "Sorry, it appears that book is not in your shelf."
            })
            return
        }

        let updatedBook = await Book.findOneAndUpdate({title: title}, {rating: newRating, shelf: newShelf})

        response.status(201).json({
            success: true,
            message: `${book.title} has been updated`,
            data: updatedBook
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
            message: `${book.title} has been removed from bookshelf.`
        })
    } catch (error) {
        return response.json({
            message: error.message
        })
    }
    

})




module.exports = router