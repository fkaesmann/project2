//Stock Schema

const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  stock: String,
  purchaseDate: Date,
  purchasePrice: {
    type: Number,
    min: 0.0
  },
  sellAtPrice: {
    type: Number,
    min: 0.0
  }
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
