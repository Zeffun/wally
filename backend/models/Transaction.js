const mongoose = require("mongoose");

const currencyEnums = ["SGD"];

const transactionSchema = new mongoose.Schema(
  {
    senderAcc: {
      //referencing
      type: Number,
      // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    receiverAcc: {
      //referencing
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: currencyEnums,
    },
    amount: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
