const jwt = require("jsonwebtoken");

const setUser = (req, user) => {
  req.user = user;
};

const getUser = (req) => req.user;

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    setUser(req, decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authorization token." });
  }
}

module.exports = { verifyToken, getUser };