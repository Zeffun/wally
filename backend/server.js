const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./controllers/UsersController")
const accountRouter = require("./controllers/AccountsController");
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
});


const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);
// app.use("/api/transactions", hootsRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

