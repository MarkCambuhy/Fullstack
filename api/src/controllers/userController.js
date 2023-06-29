import User from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById({ id: req.params._id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msn: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userUpdated = req.body;
    await User.findByIdAndUpdate({ id: req.params._id }, userUpdated);
    res.status(200).json(`User has been updated!`);
  } catch (err) {
    res.status(500).json({ msn: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ id: req.params._id });
    res.status(200).json(`User has been delete!`);
  } catch (err) {
    res.status(500).json({ msn: err.message });
  }
};

export default { getUser, updateUser, deleteUser };
