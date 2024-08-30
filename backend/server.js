const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: "hoot"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
