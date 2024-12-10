
const { UserModel } = require("../../models/UserModel");

async function createUser(email, username, password, isChild) {
    let newUser = UserModel.create({
        email: email,
        username: username,
        password: password,
        isChild: isChild
    });

    return newUser;
}

module.exports = {
    createUser,
}