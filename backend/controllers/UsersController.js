const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verify-token");

const SALT_LENGTH = 20;

const createJWT = (user) => {
    const payload = { username: user.username, _id: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "8000hr" };
    return jwt.sign(payload, secret, options);
  };

router.post("/signup", async (req, res) => {
    const { username } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_LENGTH);
      const user = await User.create({ username, hashedPassword });
      const token = createJWT(user);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.post("/login", async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      const match = await bcrypt.compare(req.body.password, user.hashedPassword);
      if (match) {
        const token = createJWT(user);
        return res.status(200).json({ token });
      }
      res.status(401).json({ error: "Invalid username or password." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;