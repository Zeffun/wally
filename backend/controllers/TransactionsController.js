const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const debug = require("debug")("wally:transaction:TransactionsController");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verify-token");

//protected routes

router.use(verifyToken);

// Test route
router.get("/", async (req, res) => {
  await res.status(201).send("Route is working");
});

// Creating a new transaction
router.post("/new", async (req, res) => {
  debug(`body: %o`, req.body);
  try {
    const { senderAcc, receiverAcc, amount } = req.body;

    // Find the sender's account
    const senderAccount = await Account.findById(senderAcc);
    if (!senderAccount || senderAccount.balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds or account not found" });
    }

    // Deduct the amount from the sender's account
    senderAccount.balance -= amount;
    await senderAccount.save();

    // Optionally find the receiver's account and credit the amount
    const receiverAccount = await Account.findById(receiverAcc);
    if (receiverAccount) {
      receiverAccount.balance += amount;
      await receiverAccount.save();
    }

    // Create the transaction
    const transaction = new Transaction(req.body);
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Viewing transaction history
router.get("/history", async (req, res) => {
  debug(`body: %o`, req.body);
  try {
    currentUserId = req.body.userid;
    const transactionHistory = await Transaction.Find({
      $or: [{ senderAcc: currentuserId }, { receiverAcc: currentuserId }],
    });
    res.status(200).json(transactionHistory);
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: error.message });
  }
});

// Viewing transaction history
router.get("/history", async (req, res) => {
  debug(`body: %o`, req.body);
  try {
    currentUserId = req.body.userid;
    const transactionHistory = await Transaction.Find({
      $or: [{ senderAcc: currentuserId }, { receiverAcc: currentuserId }],
    });
    res.status(200).json(transactionHistory);
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/new", async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { senderAcc, receiverAcc, amount } = req.body;

//     // Find the sender's account
//     const senderAccount = await Account.findById(senderAcc).session(session);
//     if (!senderAccount || senderAccount.balance < amount) {
//       throw new Error("Insufficient funds or account not found");
//     }

//     // Deduct the amount from the sender's account
//     senderAccount.balance -= amount;
//     await senderAccount.save({ session });

//     // Optionally find the receiver's account and credit the amount
//     const receiverAccount = await Account.findById(receiverAcc).session(
//       session
//     );
//     if (receiverAccount) {
//       receiverAccount.balance += amount;
//       await receiverAccount.save({ session });
//     }

//     // Create the transaction
//     const transaction = new Transaction(req.body);
//     await transaction.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json(transaction);
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Transaction error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// router.post("/new", async (req, res) => {
//   debug("Starting transaction creation");
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { senderAcc, receiverAcc, amount } = req.body;

//     // Assuming you have a method to find the account and update its balance
//     const senderAccount = await Account.findById(senderAcc).session(session);
//     debug(senderAccount);
//     const receiverAccount = await Account.findById(receiverAcc).session(
//       session
//     );
//     debug(receiverAccount);

//     if (!senderAccount || !receiverAccount) {
//       throw new Error("One or both accounts not found");
//     }

//     // Check for sufficient balance in sender's account
//     if (senderAccount.balance < amount) {
//       throw new Error("Insufficient balance");
//     }

//     // Deduct amount from sender's account
//     senderAccount.balance -= amount;
//     await senderAccount.save({ session });

//     // Add amount to receiver's account
//     receiverAccount.balance += amount;
//     await receiverAccount.save({ session });

//     // Create the transaction record
//     const newTransaction = new Transaction({
//       senderAcc,
//       receiverAcc,
//       amount,
//       currency: req.body.currency,
//       purpose: req.body.purpose,
//     });

//     await newTransaction.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json(newTransaction);
//   } catch (error) {
//     // Rollback the transaction in case of error
//     await session.abortTransaction();
//     session.endSession();

//     console.error("Error during transaction creation:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
