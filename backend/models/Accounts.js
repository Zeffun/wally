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
      type: Date,
      required: true,
    },
    userid: {
      //connect via obj id-s
      type: Number,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
