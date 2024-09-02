const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Account = require("../models/Account");
const router = express.Router()

router.use(verifyToken);

router.post("/create", async(req, res) => {
    req.body.userId = req.user._id;
    const newAccount = await Account.create(req.body);
    // Account._doc.userid = req.user 
    res.status(201).json(newAccount); 
})


module.exports = router;



