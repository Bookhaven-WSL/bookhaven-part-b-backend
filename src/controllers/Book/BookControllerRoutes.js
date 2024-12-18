const express = require("express")
const { Book } = require("../../models/BookModel")
const { getSingleApiEntry, getMultipleApiEntriesTitle, getMultipleApiEntriesGenre } = require("../../functions/APIrequest")
const { UserAuthValidation } = require("../../functions/JWTFunctions")
const { addBookToShelf } = require("../../functions/middlewareFunctions")
const router = express.Router()

router.post("/", UserAuthValidation, async (request, response) => {
    try {
        let olid = request.body.olid
        let title = request.body.title
        let authors = request.body.authors
        let genre = request.body.genre
        let publishYear = request.body.publishYear
        let rating = request.body.rating
        let shelf = request.body.shelf
        let associatedEmail = request.authUserData.email

        if (!title || !authors) {
            response.status(400).json({
                message: "Sorry, looks like you are missing title or author details."
            })
            return
        }
        
        const validShelves = ['read', 'tobeRead', 'recommended'];
        if (!validShelves.includes(shelf)) {
            throw new Error ("Please input a correct shelf");
        }

        let bookCheck = await Book.exists({olid: olid, title: title, authors: authors, associatedEmail: associatedEmail})

        if (bookCheck) {
            response.status(400).json({
                message: "This book is already in your bookshelf "
            })
            return
        }

        let newBook = await Book.create({ olid: olid, title: title, authors: authors, genre: genre, publishYear: publishYear, rating: rating, shelf: shelf, associatedEmail: associatedEmail})
        

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


router.post("/to-be-read", UserAuthValidation, async (request, response) => {
    try {
        const { olid } = request.body;
        const associatedEmail = request.authUserData.email;

        if (!olid || typeof olid !== "string") {
            return response.status(400).json({ message: "Invalid olid format." });
        }

        // Fetch book details from the external API
        const result = await getSingleApiEntry(olid);
        console.log("API Result:", result);

        // Validate the API response structure
        if (!result || !Array.isArray(result) || result.length === 0 || !Array.isArray(result[0])) {
            return response.status(404).json({ message: "Book not found or API response is invalid." });
        }

        // Safely destructure API result with default values
        const [apiOlid, title = "Unknown Title", authors = ["Unknown Author"], genres = [], publishYear = "Unknown", coverImage = ""] = result[0] || [];

        // Further validation
        if (!title || authors.length === 0) {
            return response.status(400).json({ message: "Invalid API response: Missing title or authors." });
        }

        // Insert or update the book in MongoDB
        const newBook = await Book.findOneAndUpdate(
            { olid: apiOlid, associatedEmail },
            {
                $setOnInsert: {
                    olid: apiOlid,
                    title,
                    authors,
                    genre: genres,
                    publishYear,
                    coverImage,
                    shelf: "toBeRead",
                    associatedEmail
                }
            },
            { upsert: true, new: true }
        );

        // Return success response
        response.status(201).json({
            book: {
                olid: newBook.olid,
                title: newBook.title,
                authors: newBook.authors,
                genre: newBook.genre,
                publishYear: newBook.publishYear,
                shelf: newBook.shelf
            }
        });
    } catch (error) {
        console.error("Error adding book:", error);

        // Handle duplicate and generic errors
        if (error.code === 11000) {
            return response.status(400).json({ message: "Book already exists in your bookshelf." });
        } else {
            return response.status(500).json({ message: error.message });
        }
    }
});


router.post ("/read", UserAuthValidation, async (request, response) => {
    try {

        let olid = request.body.olid
        let associatedEmail = request.authUserData.email
        let shelf = "read"

        const result = await getSingleApiEntry(olid)

        let bookCheck = await Book.exists({olid: olid, associatedEmail: associatedEmail})

        if (bookCheck) {
            response.status(400).json({
                message: "This book is already in your bookshelf "
            })
            return
        }

        const newBook = await Book.create({ olid: result[0][0].olid, title: result[0][1].title, authors: result[0][2].authors, genre: result[0][3].genres, publishYear: result[0][4].publishYear, coverImage: result[0][5].coverImage, shelf: "read", associatedEmail: associatedEmail})
    
        const userBook = await addBookToShelf(olid, shelf, newBook, associatedEmail)

        response.json({
            book: {
                olid: newBook.olid,
                title: newBook.title,
                authors: newBook.authors,
                genre: newBook.genre,
                publishYear: newBook.publishYear,
                shelf: newBook.shelf
            }
        })
    
     }catch (error) {
        console.error("Error adding book", error);
        return response.status(501).json(error.message)
    }
    
})

router.post ("/recommended", UserAuthValidation, async (request, response) => {
    try {

        let genre = request.body.genre
        let associatedEmail = request.authUserData.email
        let shelf = "recommended"

        const result = await getMultipleApiEntriesGenre(genre)

        for (let books of result) {
            await Book.create({ olid: books[0].olid, title: books[1].title, authors: books[2].authors, genre: books[3].genres, publishYear: books[4].publishYear, coverImage: books[5].coverImage, shelf: "recommended", associatedEmail: associatedEmail})
        }

        const userBook = await addBookToShelf(olid, shelf, newBook, associatedEmail)

        return response.json ({
            message: "Recommended books successfully added to database!"
        })
    }
    catch (error) {
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
    }
    catch (error) {
        console.error("Error displaying books", error);
        return response.status(501).json(error.message)
    }
})

router.post ("/search-personal", UserAuthValidation, async (request, response) => {
    try {

        let title = request.body.title
        let shelf = request.body.shelf
        let associatedEmail = request.authUserData.email
        
        let result = await Book.findOne({title: title, shelf: shelf, associatedEmail: associatedEmail})

        if (!result) {
            response.status(400).json({
                message: "Sorry, it appears that book is not in your shelf."
            })
            return
        }

        response.json({
            book: {
                olid: result.olid,
                title: result.title,
                authors: result.authors,
                genre: result.genre,
                publishYear: result.publishYear,
                shelf: result.shelf
            }
        })
    }
    catch (error) {
        console.error("Error finding book", error);
        return response.status(501).json(error.message)
    }
})

router.get ("/to-be-read", UserAuthValidation, async (request, response) => {
    try {

        let associatedEmail = request.authUserData.email

        let books = await Book.find({shelf:"toBeRead", associatedEmail: associatedEmail});

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

router.get ("/read", UserAuthValidation, async (request, response) => {
    try {

        let associatedEmail = request.authUserData.email

        let books = await Book.find({shelf:"read", associatedEmail: associatedEmail});

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

router.get ("/recommended", UserAuthValidation, async (request, response) => {
    try {

        let associatedEmail = request.authUserData.email

        let books = await Book.find({shelf:"recommended", associatedEmail: associatedEmail});

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

router.patch("/update", UserAuthValidation, async (request, response) => {
    try {
        let title = request.body.title
        let associatedEmail = request.authUserData.email
       
        let bookCheck = await Book.findOne({title: title, associatedEmail: associatedEmail})

        if (bookCheck === null) {
            response.status(400).json({
                message: "Sorry, it appears that book is not in your shelf."
            })
            return
        }

        let newRating = request.body.rating || bookCheck.rating
        let newShelf = request.body.shelf || bookCheck.shelf
        const validShelves = ['read', 'toBeRead', 'recommended'];

        if(request.body.shelf){
            
            if (!validShelves.includes(request.body.shelf)) {
                throw new Error ("Please input a correct shelf");
            }
        }

        let updatedBook = await Book.findOneAndUpdate({title: title, associatedEmail: associatedEmail}, {rating: newRating, shelf: newShelf})

        response.json({
            message: `${updatedBook.title} has been updated`
        })
    } catch (error) {
        response.status(501).json({
            message: error.message
        })
    }
})


router.delete("/delete", UserAuthValidation, async (request, response) => {
    try{

        let title = request.body.title
        let associatedEmail = request.authUserData.email
        
        let result = await Book.findOne({title: title, associatedEmail: associatedEmail})

        if (result === null) {
        response.status(400).json({
            message: "Sorry, it appears that book is not in your shelf"
            })
        return
        }

        let book = await Book.deleteOne({title: title, associatedEmail: associatedEmail})

        response.json ({
            message: `${result.title} has been removed from bookshelf.`
        })
    }
    catch (error) {
        return response.json({
            message: error.message
        })
    }
})

module.exports = router