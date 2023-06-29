import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

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
      res.status(201).json(savedUser);
    } else {
      res.status(401).json("Conflict!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { login, register };
