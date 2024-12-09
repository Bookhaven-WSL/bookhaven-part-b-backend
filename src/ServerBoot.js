require("dotenv").config()

const { dbConnection } = require('./functions/DBFunctions.js')
var {app} = require('./ServerConfig.js')

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    await dbConnection()
    if (process.env.DATABASE_URL) {
        console.log("Server is running on port " + PORT)
    }
    else {
        console.log(`Server is running on port http://localhost:${PORT}`)
    }
})