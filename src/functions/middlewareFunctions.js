
const { User } = require("../models/UserModel")

async function addBookToShelf(olid, shelf, newBook, associatedEmail) {
    try {
        const validShelves = ["toBeRead", "read", "recommended"];
        if (!validShelves.includes(shelf)) {
            throw new Error ("Invalid shelf selection");
        }

        const user = await User.findOne({email: associatedEmail});
        if(!user) throw new Error ("User does not exist");

        user.bookshelves[shelf].push(newBook)

        await user.save();

        return {message: "Book saved to users bookshelf"}

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function getBooksFromShelf(associatedEmail, shelf) {
    try {
        const user = await User.findOne({ email: associatedEmail }).populate(`bookshelves.${shelf}`);
        if (!user) throw new Error("User not found");

        return user.bookshelves[shelf];
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = {
    addBookToShelf, getBooksFromShelf
}