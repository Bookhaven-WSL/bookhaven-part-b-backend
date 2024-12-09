const mongoose = require("mongoose")

async function dbConnection() {
    let databaseURL = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`
    await mongoose.connect(databaseURL)
    console.log("Feeling connected to the database at " + databaseURL)
}

async function dbDisconnection() {
    await mongoose.connection.close();
    console.log("I have officially disconnected from the database")
};

async function dbDrop () {
    await mongoose.connection.db.dropDatabase();
    console.log("Oops, I just dropped the database");
};
module.exports = {
    dbConnection,
    dbDisconnection,
    dbDrop
}