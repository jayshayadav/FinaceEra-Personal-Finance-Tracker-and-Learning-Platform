const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tutorial: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" },
  completed: Boolean,
});

module.exports = mongoose.model("Progress", progressSchema);
