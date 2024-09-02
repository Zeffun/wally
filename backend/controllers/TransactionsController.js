const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const debug = require("debug")("wally:transaction:TransactionsController");
const verifyToken = require("../middleware/verify-token");

//protected routes

router.use(verifyToken);

// Test route
router.get("/", async (req, res) => {
  await res.status(201).send("Route is working");
});

// Creating a new transaction
router.post("/new", async (req, res) => {
  // await res.status(201).send("Route is working");
  debug(`body: %o`, req.body);
  try {
    req.body.userid = req.user._id;
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error during transaction creation:", error);
    res.status(500).json({ error: error.message });
  }
});

// Viewing transaction history
router.get("/history", async (req, res) => {
  debug(`body: %o`, req.body);
  try {
    currentUserId = req.body.userid;
    const transactionHistory = await Transaction.Find({
      $or: [
        { senderAcc: currentuserId },
        { receiverAcc: currentuserId }
      ]
    });
    res.status(200).json(transactionHistory);
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: error.message });
  }
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
console.log("TransactionsController loaded");
