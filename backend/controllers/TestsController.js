const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).send("Route is working");
});

module.exports = router;
