const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");

const registerUser = async(req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword});
        await user.save();
        res.status(201).json({message: "User Created Successfully"});
    } catch (error) {
        next(error);
        // next(errorHandler(300, "something went wrong"));
    }
}

module.exports = {
    registerUser
}