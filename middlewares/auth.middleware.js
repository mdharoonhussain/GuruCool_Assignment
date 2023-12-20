const jwt = require("jsonwebtoken");
require("dotenv").config();

const authJWT = (req,res,next) => {
  const token = req.header('Authorization');
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authJWT;
