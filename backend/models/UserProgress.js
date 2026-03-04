const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: "LearningTopic" }]
}, { timestamps: true });

module.exports = mongoose.model("UserProgress", UserProgressSchema);
