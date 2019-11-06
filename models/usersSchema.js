//Products

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  premium: Boolean
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
