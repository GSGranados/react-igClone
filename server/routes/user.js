const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const requireLogin = require("../middleware/loginVerify");

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "User Not Found",
        error: err,
      });
    });
});

module.exports = router;
