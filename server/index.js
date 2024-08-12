const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connected successfully");
}).catch((err) => {
    console.log("error in DB connect", err);
})
const app = express();

app.use(express.json());

// create server
app.listen(3000, () => {
    console.log("Server is listning on port 3000!");
});

// api calls
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        status: false,
        message,
        statusCode
    });
});