const express = require("express");
// const { verifyToken, getUser } = require("../middleware/verify-token");
const Transaction = require("../models/Transaction");
const router = express.Router();

//protected routes

// router.use(verifyToken);
const mockAccount1 = {
  acId: 123456789101,
};

const ac1Num = mockAccount1.acId;

const mockAccount2 = {
  acId: 123456789102,
};

const mockTransaction = {
  senderAcc: mockAccount1.acId,
  receiverAcc: mockAccount2.acId,
  currency: "SGD",
  amount: 1000,
  purpose: "test",
};

// Transaction.find({ userAcc: ac1Num })
//   .sort({ date: -1 })
//   .limit(50)
//   .exec((err, transactions) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to retrieve transactions" });
//     }
//     res.json(transactions);
//   });

module.exports = router;
