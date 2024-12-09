const { createBook } = require("./crud/BookCrud");
const { dbConnection, dbDiscnnection } = require("./DBFunctions");


async function seed() {
    
    let newBook = await createBook (
        "/books/OL37239326M", "Crime and Punishment", "Фёдор Михайлович Достоевский")
}