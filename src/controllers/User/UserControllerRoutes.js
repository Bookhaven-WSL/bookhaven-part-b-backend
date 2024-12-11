const express = require("express")
const router = express.Router()
const { User } = require("../../models/UserModel")
const bcrypt = require("bcrypt")

router.patch("/update", async (request, response) => {
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

    let updatedUser = await User.findOneAndUpdate({email: email}, {username: username})

    response.json({
        message: `Hey, your username has been updated to ${updatedUser.username}`
    })
})

module.exports = router