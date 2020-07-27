const express = require("express");
const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//let User = new mongoose.model("User");
const router = express.Router();
//const jwt = require("jsonwebtoken");
//const { jwt_secret } = require("../keys");
const Post = mongoose.model("Post");

const LoginRequred = require("../middleware/LoginRequired");

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err.message));
});

router.post("/createpost", LoginRequred, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) res.status(422).json({ error: "Enter all the fields" });
  req.user.password = undefined;
  //console.log(req.user);
  //res.send("hello world");
  let post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((re) => res.json({ post: re }))
    .catch((err) => console.log(err.message));
});

router.get("/myposts", LoginRequred, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((post) => res.json({ post }))
    .catch((err) => console.log(err));
});

module.exports = router;
