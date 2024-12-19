require("dotenv").config()
const { app } = require("../src/ServerConfig.js");
const request = require("supertest")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const { User } = require("../src/models/UserModel.js");
const { dbConnection, dbDisconnection } = require("../src/functions/DBFunctions.js");

const SECONDS = 1000;
jest.setTimeout(50 * SECONDS)

describe("/auth/signup & /auth/login", () => {

    beforeAll(async () => {
        await dbConnection()
      })
    
      afterAll(async () => {
        await dbDisconnection()
      })

    test("/auth/signup takes a users details, stores them to the database and returns them with a JWT", async () => {
        
        const response = await request(app)
            .post("/auth/signup")
            .send({
                    username: "LMD",
                    email: "louis.denman@gmail.com",
                    password: "Louis10xDeveloper"
                })
            .expect(200)

            let email = response.body.user.email

            const user = await User.findOne({email: email})

            expect(response.body).toMatchObject({
                user: {
                    username: user.username,
                    email: user.email
                }
            })
    })

    test("auth/login takes a users details, and if they are stored in the database provides a welcome back message", async () => {

        let email = "louis.denman@gmail.com"
        const user = await User.findOne({email: email})

        const response = await request(app)
            .post("/auth/login")
            .send({
                    email: user.email,
                    password: "Louis10xDeveloper"
                })
            .expect(200)

            expect(response.body).toMatchObject({
                message: ` Welcome back ${user.username}!`
            })

            await User.deleteOne({email: email})
    })
})