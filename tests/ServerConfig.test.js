const {app} = require("../src/ServerConfig.js")
const request = require("supertest")

describe("/", () => {
    test("Server returns the 'Bookhaven Backend Server' message", async () => {
        const response = await request(app).get("/")
        expect(response.body.message).toBe("Bookhaven Backend Server")
        expect(response.statusCode).toBe(200)
    })
})