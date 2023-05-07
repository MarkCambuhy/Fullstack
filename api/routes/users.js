const router = require("express").Router();
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
