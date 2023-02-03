const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  targetLanguage: { type: String },
  nativeLanguage: { type: String },
});

userSchema.statics.findAll = function () {
  return this.find({});
};
module.exports = mongoose.model("users", userSchema);
