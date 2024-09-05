const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    acId: {
      //user-generated
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
      match: [/^\d*\.?\d{0,2}$/, "Invalid amount"],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
