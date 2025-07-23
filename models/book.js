const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  coverUrl: String,
  description: String,
  dateAdded: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
