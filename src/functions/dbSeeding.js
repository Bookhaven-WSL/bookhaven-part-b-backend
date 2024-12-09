const { createBook } = require("./crud/BookCrud");
const { dbConnection, dbDisconnection } = require("./DBFunctions");

require("dotenv").config();


async function seedBook() {

    let key = "OL24574391W";
    
    await createBook(
        key, 
        "Crime and Punishment", 
        "Фёдор Михайлович Достоевский",
        ["Crime", "Fiction"],
        "1866",
        `${key}-M`,
        5,
    );
    console.log("Book has been seeded, disconnecting from database");
    await dbDisconnection();

}

dbConnection().then(() => {
    console.log("Connected to database, seeding Book now!");
    seedBook();
});