const jwt = require("jsonwebtoken")
let jwtSecretKey = process.env.JWT_SECRET_KEY

function generateJWT(userId, username, email, childAccount = null) {
    return jwt.sign(
        {
            userId: userId,
            username: username,
            email: email,
            childAccount: childAccount
        },
        jwtSecretKey,
        {
            expiresIn: "7d"
        }
    )
}

function decodeJWT(codedJwtToken) {
    return jwt.verify(codedJwtToken, jwtSecretKey)
}

async function UserAuthValidation(request, response, next) {
    let jwtToken = request.headers.jwt
    if (!jwtToken) {
        return response.status(403).json({
            message: "Please sign in to view your content."
        })
    }

    let decodedData = decodeJWT(jwtToken)
    console.log(decodedData)
    if (decodedData.userId) {
        request.authUserData = decodedData
        next()
    }
    else {
        return response.status(403).json({
            message: "Why have you not signed in yet?"
        })
    }
}

module.exports = {
    generateJWT,
    decodeJWT,
    UserAuthValidation
}