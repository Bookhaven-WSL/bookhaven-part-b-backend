const express = require("express")
const router = express.Router()
const { User } = require("../../models/UserModel")
const bcrypt = require("bcrypt")

router.patch("/update", async (request, response) => {
    try {
        let previousUsername = request.body.previousUsername
        let newUsername = request.body.newUsername
        let email = request.body.email
        let password = request.body.password

        if (!previousUsername || !newUsername || !email || !password) {
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

        let updatedUser = await User.findOneAndUpdate({email: email}, {username: newUsername})

        response.json({
            message: `Hey, your username has been updated to ${newUsername}`
        })
    }
    catch (error) {
        response.json({
            message: error.message
        })
    }
})

router.delete("/delete", async (request, response) => {
    try {
        let email = request.body.email
        let password = request.body.password

        if (!email || !password) {
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

        let deletedUser = await User.deleteOne({email: email}).exec()

        response.json({
            message: "Thank you for your time with us. Your account has been deleted."
        })
    }
    catch (error) {
        response.json({
            message: error.message
        })
    }
})

module.exports = router