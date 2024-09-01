const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const debug = require("debug")("wally:transaction:TransactionsController");

//protected routes

// router.use(verifyToken);
const mockAccount1 = {
  _id: 12345667,
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

// router.use(verifyToken);

router.post("/new", (req, res) => {
  res.status(200).send("Route is working");
  // debug(`body: %o`, req.body);
  // console.log(`body:%o`, req.body);
  // try {
  //   req.body.userid = mockAccount1._id; // Corrected the variable name
  //   const transaction = await Transaction.create(req.body);
  //   transaction._doc.userid = mockAccount1._id; // Assuming currentUser is meant to be mockAccount1
  //   res.status(201).json(transaction);
  // } catch (error) {
  //   console.error("Error during transaction creation:", error); // More detailed logging
  //   res.status(500).json({ error: error.message }); // Provide error message in response
  // }
});

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
