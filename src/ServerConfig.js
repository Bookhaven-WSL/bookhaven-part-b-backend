require("dotenv").config()

const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (request, response) => {
    response.json({
        message: "Bookhaven Backend Server"
    })
})

const UserControllerRoutes = require("./controllers/User/UserControllerRoutes.js")
app.use("/user", UserControllerRoutes)

module.exports = {app}