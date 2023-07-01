import User from "../models/User.js";
import { logger } from "../middlewares/logs.js";

const register = async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const savedUser = await newUser.save();
      logger.info(`User successfully registered`);
      res.status(201).json(savedUser);
    } else {
      logger.error(`User failed registered`);
      res.status(401).json("Conflict!");
    }
  } catch (err) {
    logger.error(`User failed registered`);
    res.status(500).json(err);
  }
};

export default { register };
