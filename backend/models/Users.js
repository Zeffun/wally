const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cxId: {
      //this is the internal userId, we generate our own 8-digit unique number
      type: Number,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
