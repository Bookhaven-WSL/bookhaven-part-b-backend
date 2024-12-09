
const { BookModel, Book } = require("../../models/BookModel")

async function createBook (key, title, authors, genre, publishYear, coverImage, rating, shelf) {
    let result = await Book.create({
        key: key,
        title: title,
        authors: authors,
        genre: genre,
        publishYear: publishYear,
        coverImage: coverImage,
        rating: rating,
        shelf: shelf
    });
    return result;
}


module.exports = {
    createBook,

}