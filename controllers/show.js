// DEPENDENCIES
const express = require("express");
const router = express.Router();
// const User = require("../models/stockSchema.js");
const Stock = require("../models/stockSchema.js");

// ROUTES
// get index
router.get("/:id", (req, res) => {
  id = req.params.id;
  // finds all users
  Stock.findById(id, (err, individualStocks) => {
    res.render("show.ejs", {
      stock: individualStocks
    });
  });
});

//edit existing pokemon
router.get("/:id/edit", (req, res) => {
  index = req.params.id;

  //   Stock.findByIdAndUpdate(index, req.body, {new: true}, (err, updatedModel) => {
  Stock.findById(index, (err, individualStock) => {
    // console.log("In edit individualStock, index =>", index, individualStock);
    res.render("edit.ejs", {
      stock: individualStock,
      productID: index
    });
  });
});

router.post("/yes/:index", (req, res) => {
  index = req.params.index;

  Stock.findByIdAndUpdate(index, req.body, {new: true}, (err, updatedModel) => {
    console.log("In edit post, updatedModel =>", updatedModel);
    res.render("show.ejs", {
      stock: updatedModel,
      id: index
    });
  });
});
// post a new message
// NOTE: as given, this only works if you have sessions working correctly
// if you can't get sessions working correctly, see if you can modify this code so that it works even without sessions!
router.post("/new", (req, res) => {
  console.log("in update new, req.body => ", req.body);
  Stock.create(req.body, (error, createProduct) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/");
    }
  });
});

router.delete("/:index", (req, res) => {
  console.log(" =============== ");
  console.log(" =============== ");
  console.log(" =============== ");
  console.log("in delete");
  const index = req.params.index;
  Stock.findByIdAndRemove(index, (err, data) => {
    res.redirect("/");
  });
});
// EXPORT
module.exports = router;
