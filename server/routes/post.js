const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/loginVerify");

router.post("/post/create", requireLogin, (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({
      message: "Please add all the required fields",
      code: 422,
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Posted Created Successfylly",
        post: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Something went wrong",
        code: 400,
      });
    });
});

router.get("/posts", requireLogin, (req, res, next) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
        code: 400,
      });
    });
});

router.get("/myposts", requireLogin, (req, res, next) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
        code: 400,
      });
    });
});

module.exports = router;
