const express = require("express");
const router = express.Router();
const User = require("../models/usersSchema.js");
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

router.post("/", (req, res) => {
  console.log("in create new user: req.body.password  => ", req.body.password);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  console.log("in create new user: req.body => ", req.body);
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
