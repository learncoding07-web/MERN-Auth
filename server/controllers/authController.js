const User = require("../models/Users");
const bcrypt = require("bcryptjs");

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword});
        await user.save();
        res.status(201).json({message: "User Created Successfully"});
    } catch (error) {
        console.log("error in signup", error);
        res.status(500).json({message: error.message});
    }
    
}

module.exports = {
    registerUser
}