import { logger } from "../middlewares/logs.js";
import Post from "../models/Post.js";

const criarPost = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const savedPost = await newPost.save();
    logger.info(`Create post successful`);
    res.status(201).json(savedPost);
  } catch (error) {
    logger.error(`Failed to create post`);
    res.status(500).json(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    logger.info(`GET post successful`);
    res.status(200).json(posts);
  } catch (error) {
    logger.error(`Failed to GET post successful`);
    res.status(500).json(error);
  }
};

export default { criarPost, getPosts };
