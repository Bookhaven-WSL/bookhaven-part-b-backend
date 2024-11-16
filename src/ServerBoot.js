var {app} = require('./ServerConfig.js')

require("dotenv").config()
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})