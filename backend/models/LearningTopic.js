const mongoose = require("mongoose");

const LearningTopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: String, default: "General" },
  difficulty: { type: String, default: "Beginner" },
  content: { type: String, required: true }, // markdown string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LearningTopic", LearningTopicSchema);
