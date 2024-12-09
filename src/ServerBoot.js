require("dotenv").config()

const { dbConnection } = require('./functions/DBFunctions.js')
var {app} = require('./ServerConfig.js')

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    await dbConnection()

    console.log("Server is running on port " + PORT)
  
})