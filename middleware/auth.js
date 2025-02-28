const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);
    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Unathorized",
    });
    return;
  }

  next();
};

module.exports = auth;
