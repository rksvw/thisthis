const jwt = require("jsonwebtoken");
require("dotenv").config();
const { errorHandler } = require("./err");

function verifyToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = { verifyToken };
