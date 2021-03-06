const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = require("../models/user");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      message: "You must be logged in.",
      status: 401,
    });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          message: "You must be logged in",
          error: err,
        });
      } else {
        const { _id } = payload;
        User.findById(_id).then((userData) => {
          req.user = userData;
          next();
        });
      }
    });
  }
};
