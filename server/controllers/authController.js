const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const loginUser = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        // find is user exists or not
        const user = await User.findOne({email});
        if(!user) return next(errorHandler(404, "Please Login First"));
        
        // check for password
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return next(errorHandler(401, "Wrong Credentials"));
        
        const token = await jwt.sign({id: user._id}, process.env.JWT_KEY);
        const {password: hashedPassword, ...restUserData} = user._doc;
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000)
        res.cookie('access_token', token, {httpOnly : true,expires: expiryDate}).status(200).json(restUserData);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser
}