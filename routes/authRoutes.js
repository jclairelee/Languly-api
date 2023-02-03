const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator();
const auth = require("../middleware/auth");
const users = require("../models/users");
//First Validation
const signupSchema = joi.object(
  {
    username: joi.string().min(3).max(16).required(),
    password: joi.string().min(7).max(16).required(),
    email: joi.string().email().required(),
    targetLanguage: joi.string().min(3).max(16).required(),
    nativeLanguage: joi.string().min(3).max(16).required(),
  },
  {
    versionKey: false,
  }
);

const loginSchema = joi.object({
  password: joi.string().min(7).max(16).required(),
  email: joi.string().email().required(),
});

router.post(
  "/signup",
  validation.body(signupSchema),
  authControllers.controllers.postSignup
);
router.post(
  "/login",
  validation.body(loginSchema),
  authControllers.controllers.postLogin
);

//test route to verify if the middlerware is working
router.get("/test", auth, (req, res) => {
  res.send("request successfully processed");
});

router.get("/", (req, res) => {
  users
    .findAll()
    .then((users) => {
      if (!users.length)
        return res.status(404).send({ err: "No users are found " });
      res.send(users);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
