const express = require("express")
const { User } = require("../../models/UserModel")
const { generateJWT } = require("../../functions/JWTFunctions")
const router = express.Router()

router.post("/signup", async (request, response) => {
    let username = request.body.username
    let email = request.body.email
    let password = request.body.password

    if (!username || !email || !password) {
        response.status(400).json({
            message: "Sorry, looks like you are missing username or password details."
        })
    }

    let newUser = await User.create({username: username, email: email, password: password})

    let newJWT = generateJWT(newUser.id, newUser.username, newUser.email)

    response.json({
        jwt: newJWT,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }
    })
})

module.exports = router
