import Post from "../models/Post.js";

const criarPost = async (req, res) => {
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
};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { criarPost, getPosts };
