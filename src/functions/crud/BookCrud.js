
const { BookModel } = require("../../models/BookModel")

async function createBook (olid, title, authors, genre, publishYear, coverImage, rating, shelf) {
    let newBook = await BookModel.create({
        olid: olid,
        title: title,
        authors: authors,
        genre: genre,
        publishYear: publishYear,
        coverImage: coverImage,
        rating: rating,
        shelf: shelf
    });
    return newBook;
}

async function findOneBook() {

}


async function findManyBooks() {

}


async function updateOneBook() {

}

async function deleteManyBooks() {
    
}


async function deleteOneBook() {

}


async function deleteManyBooks() {

}
module.exports = {
    createBook,

}