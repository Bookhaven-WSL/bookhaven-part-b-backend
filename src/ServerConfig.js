require("dotenv").config()

const express = require("express")

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const { getMultipleApiEntries, getSingleApiEntry } = require("./functions/APIrequest.js")
const { UserAuthValidation } = require("./functions/JWTFunctions.js")
const AuthControllerRoutes = require("./controllers/User/AuthControllerRoutes.js")
const BookController = require("./controllers/Book/BookControllerRoutes.js.js")
const UserControllerRoutes = require("./controllers/User/UserControllerRoutes.js")

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

app.get("/testRoute", UserAuthValidation, async (request, response) => {
    //const APIresult = await getMultipleApiEntries("The Lord of The Rings")
    const APIresult = await getSingleApiEntry("OL27448W")
    response.json({
        response: APIresult
    })
})

app.use("/auth", AuthControllerRoutes)

app.use("/", BookController)

app.use("/user", UserControllerRoutes)

module.exports = {app}