const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    acId: {
      //this is the account number, we generate our own 12-digit unique number
      type: Number,
      required: true,
    },
    dateCreated: {
      //{timestamp}
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
