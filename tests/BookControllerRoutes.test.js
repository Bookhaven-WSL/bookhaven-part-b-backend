const {app} = require("../src/ServerConfig.js")
const request = require("supertest")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { User } = require("../src/models/BookModel")


describe("Create a new custom book", () => {
    test.skip("/book/", async () => {
        const response = await request(app)
            .post("/book/")
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                    olid: "blah blah blah",
                    title: "Star Wars: Phantom Menace",
                    authors: "George Lucas",
                    genre: "Fiction",
                    publishYear: "1990",
                    rating: 5,
                    shelf: "read"
                })

        expect(response.body).toBe({
            book: {
                olid: "blah blah blah",
                title: "Star Wars: Phantom Menace",
                authors: [
                    "George Lucas"
                ],
                genre: [
                    "Fiction"
                ],
                publishYear: "1990",
                rating: 5,
                shelf: "read"
            }
        })
    })
})