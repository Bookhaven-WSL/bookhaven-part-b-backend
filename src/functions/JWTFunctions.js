let jwtSecretKey = process.env.JWT_SECRET_KEY

function generateJWT(userId, username, childAccount = null) {
    return jwt.sign(
        {
            userId: userId,
            username: username,
            childAccount: childAccount
        },
        jwtSecretKey,
        {
            expiresIn: "7d"
        }
    )
}

function decodeJWT(codedJwtToken) {

}

async function UserAuthValidation(request, response, next) {

}

module.exports = {
    generateJWT,
    decodeJWT,
    UserAuthValidation
}