const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/loginVerify");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({
      error: "Please, provide all the necessary params",
      code: 422,
    });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({
          error:
            "A User already exists in our records with that email. Please try again",
          code: 422,
        });
      } else {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({ name, email, password: hashedPassword });
          user
            .save()
            .then((user) => {
              res.status(201).json({
                message: "User Saved Successfully",
                user: user,
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: "Something went wrong",
                error: err,
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
        error: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      message: "You are forgetting some credentials: Email or Password",
      status: 422,
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({
            message: "Invalid email or password",
            error: 422,
          });
        } else {
          bcrypt
            .compare(password, savedUser.password)
            .then((comparison) => {
              if (comparison) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                return res.status(200).json({
                  message: "Logged in successfully",
                  token,
                });
              } else {
                return res.status(422).json({
                  email: "Invalid Email or Password",
                });
              }
            })
            .catch((err) => {
              return res.status(400).json({
                message: "something went wrong",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "something went wrong",
          error: err,
        });
      });
  }
});

module.exports = router;
