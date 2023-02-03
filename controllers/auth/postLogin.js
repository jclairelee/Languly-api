const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    console.log("login event is on");
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      //send new token
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
      return res.status(200).json({
        userInfo: {
          email: user.email,
          token: token,
          username: user.username,
          targetLanguage: user.targetLanguage,
          nativeLanguage: user.nativeLanguage,
        },
      });
    }
    return res.status(400).send("Password do not match. Please try again.");
  } catch (error) {
    return res.status(404).send("Error! Please try again");
  }
};

module.exports = postLogin;
