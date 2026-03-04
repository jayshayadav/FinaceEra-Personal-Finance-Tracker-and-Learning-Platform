const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  order: Number,
});

module.exports = mongoose.model("Tutorial", tutorialSchema);

