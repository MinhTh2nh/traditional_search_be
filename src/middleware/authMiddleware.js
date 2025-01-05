const jwt = require("jsonwebtoken");

// Bỏ xác thực token nếu endpoint không yêu cầu
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra nếu không có token
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1]; // Authorization: 'Bearer TOKEN'

  jwt.verify(token, process.env.JWT_SECRET, (err, accounts) => {
    if (err) {
      console.error("Error during token verification:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
    }
    req.accounts = accounts;
    next();
  });
};

module.exports = { verifyToken };
