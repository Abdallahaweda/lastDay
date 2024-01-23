let JWT = require("jsonwebtoken");
let User = require("../models/User");

let Authorization = async (req, res, next) => {
  let token = req.header("Authorization");
  console.log("Received token:", token);
  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ Error: "unauthorization " });
  }
  try {
    let decoded = JWT.verify(token, "aweda-secret-key");
    console.log("Decoded token:", decoded);
    req.user = await User.findById(decoded.id);
    console.log("User found:", req.user);
    next();
  } catch (e) {
    res
      .status(401)
      .json({ Error: "Invalid Token from Authorization midleware" });
  }
};
module.exports = Authorization;
