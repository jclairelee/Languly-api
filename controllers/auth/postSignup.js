const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postSignup = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const targetLanguage = req.body.targetLanguage;
    const nativeLanguage = req.body.nativeLanguage;

    //check if user already exists => it returns boolean
    const existUser = await User.exists({ email: email.toLowerCase() });
    if (existUser) {
      return res.status(402).send("Email already exsits");
    }

    //encrypt password
    const ecryptedPw = await bcrypt.hash(password, 16);

    //create user and write in database cloud
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: ecryptedPw,
      targetLanguage: targetLanguage.toLowerCase(),
      nativeLanguage: nativeLanguage.toLowerCase(),
    });

    //create JWT token only valid for 24h
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json({
      userInfo: {
        email: user.email,
        token: token,
        username: user.username,
        targetLanguage: user.targetLanguage,
        nativeLanguage: user.nativeLanguage,
      },
    });
  } catch (error) {
    return res.status(400).send("Error: request cannot be completed.");
  }
};

module.exports = postSignup;
