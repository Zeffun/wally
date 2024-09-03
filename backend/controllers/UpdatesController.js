const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Account = require("../models/Account");
const Update = require("../models/Update");
const router = express.Router();

router.use(verifyToken);
const wallyId = "66d53bce24f856a49697a87d"
router.put("/withdraw/:accountId", async (req, res) => {
    
    try {
        const { accountId } = req.params;
        console.log("AccountID", accountId)
        const verifyAccount = await Account.findById(accountId);
        if (!verifyAccount.userId.equals(req.user._id)){
            return res.status(403).send("Cannot deposit in to thirdParty accounts")
        }
        const { balance } = req.body 
        const wallyAccount = await Account.findById(wallyId)
        //wally account Id where it can bypass verifyToken
        if (balance > verifyAccount.balance){
            return res.json({ error: "Insufficent Balance" })
        }
        verifyAccount.balance -= balance
        wallyAccount.balance -= balance
        
        await wallyAccount.save()
        const updateDepositToAccount = await verifyAccount.save()
        
        
        res.status(200).json(updateDepositToAccount)

    } catch (error) {
        res.status(500).json(error)
    }
});

router.put("/deposit/:accountId", async (req, res) => {
    
    try {
        const { accountId } = req.params;
        console.log("AccountID", accountId)
        const verifyAccount = await Account.findById(accountId);
        if (!verifyAccount.userId.equals(req.user._id)){
            return res.status(403).send("Cannot deposit in to thirdParty accounts")
        }
        const { balance } = req.body 
        const wallyAccount = await Account.findById(wallyId)
        //wally account Id where it can bypass verifyToken
        
        verifyAccount.balance += balance
        wallyAccount.balance += balance
        
        await wallyAccount.save()
        const updateDepositToAccount = await verifyAccount.save()
        
        
        res.status(200).json(updateDepositToAccount)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/transactions/:accountId", async (req, res) => {
    try {
      req.body.userId = req.user._id;  
      const transactions = await Update.create(req.body);
      res.status(201).json(transactions);
    } catch (error) {
      res.status(500).json(error)
    }
  });

  router.get("/transactions", async (req, res) => {
    user = req.user._id;
    try {
      // Step 1: Find all account IDs associated with the given userId
      const accountIds = await Account.find({ userId: user })//.distinct('_id');
  
      // Step 2: Fetch all transactions where senderAcc or receiverAcc matches any of the account IDs
      const updates = await Update.find({
        $or: [
          { account: { $in: accountIds } },
        ]
      }).populate('account'); // Optional: Populate account details
  
      res.json(updates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  });

module.exports = router;
