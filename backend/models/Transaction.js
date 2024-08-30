const { Schema, model } = require("mongoose");

const currencyEnums = ["Sgd"];

const transactionSchema = new Schema(
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
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
