const mongoose = require("mongoose");

const learningProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutorial",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("LearningProgress", learningProgressSchema);
