const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;