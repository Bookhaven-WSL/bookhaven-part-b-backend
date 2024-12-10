const { createBook } = require("./crud/BookCrud");
const { createUser } = require("./crud/UserCrud");
const { dbConnection, dbDisconnection } = require("./DBFunctions");

require("dotenv").config();



async function seed() {


    await createUser("test1@email.com", "Test1", "test1password")
    
    await createBook(
        "test-olid", 
        "Book of Tests", 
        "test-author",
        ["Crime", "Fiction"],
        "1866",
        `${test-olid}-M`,
        5,
    );
    console.log("Book has been seeded, disconnecting from database");
    await dbDisconnection();

}

dbConnection().then(() => {
    console.log("Connected to database, seeding Book now!");
    seed();
});