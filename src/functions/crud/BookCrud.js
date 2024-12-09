
const { BookModel, Book } = require("../../models/BookModel")

async function createBook (key, title, authors, genre, ) {
    let result = await BookModel.create({
        key: key,
        title: title,
        authors: authors,
        genre: genre,
        

    });
    return result;
}


module.exports = {
    createBook,

}