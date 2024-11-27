const express = require("express")
const bcrypt = require("bcrypt")
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
        return
    }

    let userCheck = await User.findOne({email: email}).exec()

    if (userCheck) {
        response.status(400).json({
            message: "Sorry, it appears that email is already registered."
        })
        return
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hash(password, salt)

    let newUser = await User.create({username: username, email: email, password: hash})

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
