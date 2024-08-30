const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");

const SALT_LENGTH = 12;


router.get("/signup", (req,res) => {
    res.json({msg: "tot"})
})

router.post("/signup", async (req, res) => {
    const user = await User.create({
        cxId: req.body.cxId,
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
    })
    const token = jwt.sign({ cxId: req.body.cxId, username: req.body.username, _id: user._id}, process.env.JWT_SECRET, {expiresIn: "10000hr"});
    res.status(201).json({user, token})
})
 
  
router.post("/login", async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      const match = await bcrypt.compare(req.body.password, user.hashedPassword);
      if (match) {
        const token = jwt.sign({ cxId: req.body.cxId, username: req.body.username, _id: user._id}, process.env.JWT_SECRET, {expiresIn: "10000hr"});
        return res.status(200).json({ token });
      }
      res.status(401).json({ error: "Invalid username or password." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.use(verifyToken);

router.delete("/nukenukenuke/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const nukeAccount = await User.findByIdAndDelete(user);
        res.status(200).json(nukeAccount)
    } catch (error) {
        res.status(500).json(error);
    }

})


module.exports = router;



