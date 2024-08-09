const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connected successfully");
}).catch((err) => {
    console.log("error in DB connect", err);
})
const app = express();

app.listen(3000, () => {
    console.log("Server is listning on port 3000!");
})