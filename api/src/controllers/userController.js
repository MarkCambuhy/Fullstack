import { logger } from "../middlewares/logs.js";
import User from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById({ id: req.params._id });
    logger.info("GET user successfully");
    res.status(200).json(user);
  } catch (err) {
    logger.error("Failed to GET user");
    res.status(404).json({ msn: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userUpdated = req.body;
    await User.findByIdAndUpdate({ id: req.params._id }, userUpdated);
    logger.info("User UPDATE successfully");
    res.status(200).json(`User has been updated!`);
  } catch (err) {
    logger.error("Failed to UPDATE user");
    res.status(500).json({ msn: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ id: req.params._id });
    logger.info("User DELETE successfully");
    res.status(200).json(`User has been delete!`);
  } catch (err) {
    logger.error("Failed to DELETE user");
    res.status(500).json({ msn: err.message });
  }
};

export default { getUser, updateUser, deleteUser };
