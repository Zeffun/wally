const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
