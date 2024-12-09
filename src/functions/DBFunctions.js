const mongoose = require("mongoose")

async function dbConnection() {
    let databaseURL = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`
    await mongoose.connect(databaseURL)
    console.log("Connected to database at " + databaseURL)
}

async function dbDisconnection() {
    await mongoose.connection.close();
};

async function dbDrop () {
    await mongoose.connection.db.dropDatabase();
};
module.exports = {
    dbConnection,
    dbDisconnection,
    dbDrop
}