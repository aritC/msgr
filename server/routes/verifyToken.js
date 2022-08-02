const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "Token is Empty" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.error(err.message);
      res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};
