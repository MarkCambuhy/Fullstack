import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../middlewares/logs.js";

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) return res.status(401).json("Wrong Credentials!");
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) return res.status(401).json("Wrong Credentials!");
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1D" }
    );
    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const { password, ...others } = user._doc;
    logger.info(`User successfully login`);
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    logger.error(`User failed login`);
    res.status(500).json(`${err}`);
  }
};

export default { login };
