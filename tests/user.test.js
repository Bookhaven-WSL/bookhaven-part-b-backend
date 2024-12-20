require("dotenv").config()
const { app } = require("../src/ServerConfig.js");
const request = require("supertest")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const { User } = require("../src/models/UserModel.js");
const { dbConnection, dbDisconnection } = require("../src/functions/DBFunctions.js");
const bcrypt = require("bcrypt")

const SECONDS = 1000;
jest.setTimeout(50 * SECONDS)

describe("/user/update & /user/delete", () => {

    beforeAll(async () => {
        await dbConnection()
       
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash("Louis10xDeveloper", salt)
        
        await User.create({username: "LMD", email: "louis.denman@gmail.com", password: hash})
    })
    
    afterAll(async () => {
        await User.deleteOne({email: "louis.denman@gmail.com"})

        await dbDisconnection()
    })

    test("/user/update takes a users details along with a new username, and updates this username in the database", async () => {

        const response = await request(app)
            .patch("/user/update")
            .send({
                    previousUsername: "LMD",
                    newUsername: "LouisDenman",
                    email: "louis.denman@gmail.com",
                    password: "Louis10xDeveloper"
                })
            .expect(200)

            const user = await User.findOne({email: "louis.denman@gmail.com"})

            expect(user.username).toBe("LouisDenman")
        })

    test("user/update takes a users details, and deletes these details from the database", async () => {

        const response = await request(app)
            .delete("/user/delete")
            .send({
                    email: "louis.denman@gmail.com",
                    password: "Louis10xDeveloper"
            })
            .expect(200)

            expect(response.body.message).toBe("Thank you for your time with us. Your account has been deleted.")
    })
})