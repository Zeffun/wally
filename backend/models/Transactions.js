const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    //{timestamp}
    type: Date, //needs to conform to the ISO 8601 format. will already include the time
  },
  senderAcc: {
    //referencing
    type: Number,
    required: true,
  },
  receiverAcc: {
    //referencing
    type: Number,
    required: true,
  },
  currency: {
    type: string,
    required: true,
  },
  amount: {
    //validation, should not allow -ve values
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
