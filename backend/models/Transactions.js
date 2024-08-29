const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date, //needs to conform to the ISO 8601 format. will already include the time
  },
  senderAcc: {
    type: Number,
    required: true,
  },
  receiverAcc: {
    type: Number,
    required: true,
  },
  currency: {
    type: string,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
