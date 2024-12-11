
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

async function findOneUser() {
    let singleUser = await UserModel.findOne(query).populate("title");

    return singleUser;
}


async function findManyUsers() {
    let multipleUsers= await UserModel.find(query);

    return multipleUsers;
}

module.exports = {
    createUser,
    findOneUser, findManyUsers,
}