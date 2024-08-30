const express = require("express");
const {verifyToken, getUser} = require("../middleware/verify-token");
const Account = require("../models/Account");

router.use(verifyToken);

