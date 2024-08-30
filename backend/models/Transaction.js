const { Schema, model } = require("mongoose");

const currencyEnums = ["Sgd"];

const transactionSchema = new Schema(
  {
    userAcc: {
      type: Number,
      required: true,
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
      type: String,
      required: true,
      enum: currencyEnums,
    },
    amount: {
      //validation, should not allow -ve values
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
