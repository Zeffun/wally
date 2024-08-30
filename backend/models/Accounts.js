const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  _id: {
    //this is the account number, we generate our own 12-digit unique number
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number,
  },
  debitBalance: {
    type: Number,
  },
});

module.exports = mongoose.model("Account", accountSchema);
