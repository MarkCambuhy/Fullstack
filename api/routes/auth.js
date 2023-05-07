const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "Secret Passphrase" // Colocar em .env?
    ).toString(),
  });

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      res.status(401).json("Email inválido!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Credenciais erradas!");

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      "Secret Passphrase"
    );
    const LegitPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (LegitPassword !== req.body.password) {
      res.status(401).json("Credenciais erradas!");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "secretjwt",
      { expiresIn: "1d" }
    );
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // console.log(error);
  }
});

module.exports = router;
