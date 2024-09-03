const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Account = require("../models/Account");
const router = express.Router();

router.use(verifyToken);

router.post("/create", async (req, res) => {
  req.body.userId = req.user._id;
  const newAccount = await Account.create(req.body);
  const { balance } = req.body 
  const wallyAccount = await Account.findById("66d53bce24f856a49697a87d")
  wallyAccount.balance += balance       
  await wallyAccount.save()
  // Account._doc.userid = req.user
  res.status(201).json({ newAccount});
});

router.get("/", async (req, res) => {
  try {
    const account = await Account.find({userId: req.user._id})
    
      // .populate("User")
      // .sort({ createdAt: "desc" })
      // .exec();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

