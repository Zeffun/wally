const mongoose = require("mongoose");

const currencyEnums = ["SGD"];

const transactionSchema = new mongoose.Schema(
  {
    senderAcc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    receiverAcc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
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
      match: [/^\d*\.?\d{0,2}$/, "Invalid amount"],
    },
    purpose: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
