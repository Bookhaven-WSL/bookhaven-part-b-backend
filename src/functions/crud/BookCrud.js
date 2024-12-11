
const { BookModel, Book } = require("../../models/BookModel")

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
    let singleBook = await BookModel.findOne(query).populate("title");

    return singleBook;
}


async function findManyBooks() {
    let multipleBooks = await BookModel.find(query);

    return multipleBooks;
}


async function updateOneBook() {
//     var query = {"title", req.book.title},

//     BookModel.findOneAndUpdate(query)
// }

async function deleteManyBooks() {
    
}


async function deleteOneBook() {

}


async function deleteManyBooks() {

}
module.exports = {
    createBook,

}