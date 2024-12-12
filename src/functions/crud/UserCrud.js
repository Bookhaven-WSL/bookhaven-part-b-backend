
const { User } = require("../../models/UserModel");

async function createUser(email, username, password, isChild) {
    let newUser = User.create({
        email: email,
        username: username,
        password: password,
        isChild: isChild
    });

    return newUser;
}

async function findOneUser() {
    let singleUser = await User.findOne(query).populate("email");

    return singleUser;
}

async function findManyUsers() {
    let multipleUsers= await User.find(query);

    return multipleUsers;
}

module.exports = {
    createUser,
    findOneUser, findManyUsers,
}