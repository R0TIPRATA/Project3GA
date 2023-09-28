const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

function isUserAuthenticated(req, res, next) {
  // const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.clearCookie("access_token").clearCookie("username");
      return res.status(401).json({ message: "Unauthorized: Invalid token!" });
    }

    req.user = decoded; 

    next();
  });
}

module.exports = isUserAuthenticated;