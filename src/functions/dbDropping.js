
const { dbConnection, dbDisconnection, dbDrop } = require("./DBFunctions")

require("dotenv").config();

async function drop() {

    await dbDrop();

    console.log("Drop successful, will disconnect from database in 3...2...1.... bye now")

    await dbDisconnection();
}

   

dbConnection().then(() => {
    console.log("Connected to database and about to drop");
    drop()
})