const mongoose = require("mongoose");

const currencyEnums = ["SGD"];

const updateSchema = new mongoose.Schema(
  {
    receiverAcc: {
      type: String,
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
    },
    purpose: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Update", updateSchema);