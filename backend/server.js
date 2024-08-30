const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const transactionsRouter = require("./controllers/Transactions");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
});

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ msg: "Wally" });
});

// app.use("/api/users", transactionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
