const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");

const SALT_LENGTH = 12;

// router.get("/signup", (req,res) => {
//     res.json({msg: "tot"})
// })

router.post("/signup", async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.json({ error: "Username already taken." });
    }
    // If username not already taken, Create a new user with hashed password
    const user = await User.create({
      // cxId: req.body.cxId,
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
    });
    const token = jwt.sign(
      { cxId: req.body.cxId, username: req.body.username, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10000hr" }
    );
    res.status(201).json({ user, token });
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });

    const match = await bcrypt.compare(req.body.password, user.hashedPassword);
    if (user && match) {
      const token = jwt.sign(
        { /*cxId: req.body.cxId,*/ username: req.body.username, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "10000hr" }
      );
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "Invalid username or password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use(verifyToken)

router.put("/changepassword", async (req, res) => {
  try {
    const updatePassword = await User.findByIdAndUpdate(
      req.user._id,
      {hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)},
      {new: true}
    )
    res.status(200).json(updatePassword)
  } catch (error) {
    res.status(500).json(error);
  }
})


router.delete("/nukenukenuke", async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findById(req.user._id);
    if (username !== user.username){
      return res.status(401).json({ error: "Unauthorize"})
    }
    const nukeAccount = await User.findByIdAndDelete(req.user._id);
    res.status(200).json(nukeAccount)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
