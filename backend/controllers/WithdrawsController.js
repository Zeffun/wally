const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Account = require("../models/Account");
const router = express.Router();

router.use(verifyToken);

router.put("/:accountId", async (req, res) => {
    
    try {
        const { accountId } = req.params;
        console.log("AccountID", accountId)
        const verifyAccount = await Account.findById(accountId);
        if (!verifyAccount.userId.equals(req.user._id)){
            return res.status(403).send("Cannot deposit in to thirdParty accounts")
        }
        const { balance } = req.body 
        const wallyAccount = await Account.findById("66d53bce24f856a49697a87d")
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
    const { balance } = req.body;
    const wallyAccount = await Account.findById("66d53bce24f856a49697a87d");
    //wally account Id where it can bypass verifyToken
    if (balance > verifyAccount.balance) {
      return res.json({ error: "Insufficent Balance" });
    }

    verifyAccount.balance -= balance;
    wallyAccount.balance -= balance;

    await wallyAccount.save();
    const updateDepositToAccount = await verifyAccount.save();

    res.status(200).json(updateDepositToAccount);

});

module.exports = router;
