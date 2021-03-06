const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/loginVerify");

router.post("/post/create", requireLogin, (req, res, next) => {
  const { title, body, url } = req.body;
  if (!title || !body || !url) {
    return res.status(422).json({
      message: "Please add all the required fields",
      code: 422,
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    photo: url,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Post Created Successfully",
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
    .populate("comments.postedBy", "_id name")
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

router.put("/like", requireLogin, (req, res, next) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});
router.put("/unlike", requireLogin, (req, res, next) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

//Comment post
router.put("/comment", requireLogin, (req, res, next) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

//Delete post
router.delete("/delete/:id", requireLogin, (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({
          error: "The post doest not exist",
        });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => {
            res.status(422).json({
              error: "Something Went wrong",
              message: err,
            });
          });
      }
    });
});

module.exports = router;
