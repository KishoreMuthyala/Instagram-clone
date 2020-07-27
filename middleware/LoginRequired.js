const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  //res.setHeader("Content-Type", "text/html");
  const { authorization } = req.headers;
  //console.log(authorization);
  if (!authorization) return res.status(401).json({ error: "you must login" });
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwt_secret, (error, payload) => {
    if (error) {
      console.log(error.message);
      return res.status(401).json({ error: "you must login" });
    }

    const { _id } = payload;
    User.findById(_id).then((data) => {
      req.user = data;
      next();
      //next
    });
  });
};
