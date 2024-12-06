require("dotenv").config()

const express = require("express")

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const { UserAuthValidation } = require("./functions/JWTFunctions.js")
const AuthControllerRoutes = require("./controllers/User/AuthControllerRoutes.js")
const bookController = require("./controllers/bookRoutes.js")

let corsURLs = {
    origin: ["http://localhost:8080", "https://bookhaven-part-b-backend.onrender.com/"],
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

app.use("/auth", AuthControllerRoutes)

app.use("/", bookController)

module.exports = {app}