const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Account = require("../models/Account");
const router = express.Router()

router.use(verifyToken);

//make sure userToken verified, put request

//getAccount for testing request
router.get("/:accountId", async (req, res) => {
    // const accounts = await Account.findById(req.params.accountId).populate("userid");
    // res.json(accounts)
    const accounts = await Account.findById("66d19c9b0e7394a3ec3b6d48").populate("userid");
    res.json(accounts)

})

router.put("/:accountId", async (req, res) => {

    try {
        const verifyAccount = await Account.findById(req.params.accountId);
        if (!verifyAccount.userid.equals(req.user._id)){
            return res.status(403).send("Cannot deposit in to thirdParty accounts")
        }
        const { balance } = req.body 
        const wallyAccount = await Account.findById("66d18346b5608b98b1e39614")
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


module.exports = router
