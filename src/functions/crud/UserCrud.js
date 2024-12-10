
const { UserModel } = require("../../models/UserModel");

async function createUser(email, username, password) {
    let newUser = UserModel.create({
        email: email,
        username: username,
        password: password
    });
    
    return newUser;
}

module.exports = {
    createUser,
}