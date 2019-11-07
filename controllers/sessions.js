const express = require("express");
const router = express.Router();
const User = require("../models/usersSchema.js");
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");
const app = express();

app.use(methodOverride("_method"));

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// router.post("/", (req, res) => {
//   User.findOne({username: req.body.username}, (err, foundUser) => {
//     if (req.body.password == foundUser.password) {
//       req.session.currentUser = foundUser;
//       res.redirect("/");
//     } else {
//       res.send("wrong password");
//     }
//   });
// });
router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send("wrong password");
    }
  });
});

router.delete("/", (req, res) => {
  console.log(" ");
  console.log(" ");
  console.log("sessions delete => ");
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
