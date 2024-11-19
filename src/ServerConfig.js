require("dotenv").config()

const express = require("express")

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const { UserAuthValidation } = require("./functions/JWTFunctions.js")
const UserControllerRoutes = require("./controllers/User/UserControllerRoutes.js")

let corsURLs = {
    origin: ["http://localhost:8080"],
    URLSuccessStatus: 200
}
app.use(cors(corsURLs))

app.use((request, response, next) => {
    console.log(JSON.stringify(request.headers));
    next();
});

app.get("/", (request, response) => {
    response.json({
        message: "Bookhaven Backend Server"
    })
})

app.get("/testRoute", UserAuthValidation, (request, response) => {
    response.json({
        message: "Hello, you can view this test route because you are signed in!"
    })
})

app.use("/user", UserControllerRoutes)

module.exports = {app}