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

describe("/book/search-new & /book/recommended-new", () => {

    beforeAll(async () => {
        await dbConnection()
    })
    
    afterAll(async () => {
        await dbDisconnection()
    })

    test("/book/search-new queries the open library API by title, and returns an array of 20 books with their relevant details", async () => {
    
            const response = await request(app)
                .post("/book/search-new")
                .send({
                        title: "Harry Potter"
                    })
                .expect(200)
                expect(response.body.success).toBe(true)
                expect(response.body.books).toHaveLength(20)
            })

    test("/book/recommended-new queries the open library API by genre, and returns an array of 20 books with their relevant details", async () => {

        const response = await request(app)
            .post("/book/recommended-new")
            .send({
                    genre: "Fantasy"
                })
            .expect(200)
            expect(response.body.success).toBe(true)
            expect(response.body.books).toHaveLength(20)
        })
})