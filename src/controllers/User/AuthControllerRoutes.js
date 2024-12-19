const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../../models/UserModel")
const { generateJWT } = require("../../functions/JWTFunctions")
const router = express.Router()

router.post("/signup", async (request, response) => {
    try {
        let username = request.body.username
        let email = request.body.email
        let password = request.body.password

        if (!username || !email || !password) {
            response.json({
                message: "Sorry, looks like you are missing username or password details."
            })
            return
        }

        let userCheck = await User.exists({email: email})

        if (userCheck) {
            response.json({
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
    }
    catch (error) {
        response.json({
            message: error.message
        })
    }
})

router.post("/login", async (request, response) => {
    try {
        let email = request.body.email
        let password = request.body.password

        if (!email || !password) {
            response.status(400).json({
                message: "Sorry, looks like you are missing username or password details."
            })
            return
        }

        let userCheck = await User.findOne({email: email})

        if (userCheck === null) {
            response.status(400).json({
                message: "Sorry, it appears that email is not registered."
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, userCheck.password)

        if (!isPasswordValid) {
            response.status(400).json({
                message: "Incorrect password provided."
            })
            return
        }

        let newJWT = generateJWT(userCheck.id, userCheck.username, userCheck.email)

        response.json({
            jwt: newJWT,
            message: ` Welcome back ${userCheck.username}!`
        })
    }
    catch (error) {
        response.json({
            message: error.message
        })
    }
})

module.exports = router
