const LearningTopic = require("../models/LearningTopic");
const UserProgress = require("../models/UserProgress");

// public or protected depending on router usage
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await LearningTopic.find().sort({ createdAt: -1 });
    // If user is logged in, also return user's completed list
    let completed = [];
    if (req.user) {
      const prog = await UserProgress.findOne({ userId: req.user.id });
      completed = prog ? prog.completedTopics.map(String) : [];
    }
    res.json({ topics, completedTopics: completed });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getTopic = async (req, res) => {
  try {
    const topic = await LearningTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ msg: "Not found" });
    // check completed status for user
    let completed = false;
    if (req.user) {
      const prog = await UserProgress.findOne({ userId: req.user.id });
      completed = prog ? prog.completedTopics.map(String).includes(String(topic._id)) : false;
    }
    res.json({ ...topic.toObject(), completed });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const topicId = req.params.id;
    let prog = await UserProgress.findOne({ userId });
    if (!prog) prog = await UserProgress.create({ userId, completedTopics: [] });
    if (!prog.completedTopics.map(String).includes(String(topicId))) {
      prog.completedTopics.push(topicId);
      await prog.save();
    }
    res.json({ success: true, completedTopics: prog.completedTopics });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.markIncomplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const topicId = req.params.id;
    let prog = await UserProgress.findOne({ userId });
    if (!prog) return res.json({ success: true, completedTopics: [] });
    prog.completedTopics = prog.completedTopics.filter(id => String(id) !== String(topicId));
    await prog.save();
    res.json({ success: true, completedTopics: prog.completedTopics });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// returns user's progress percentage & completed ids
exports.getUserProgress = async (req, res) => {
  try {
    const topicsCount = await LearningTopic.countDocuments();
    const prog = await UserProgress.findOne({ userId: req.user.id });
    const completed = prog ? prog.completedTopics.length : 0;
    const percent = topicsCount ? Math.round((completed / topicsCount) * 100) : 0;
    res.json({ completedCount: completed, total: topicsCount, percent, completedTopics: prog ? prog.completedTopics : [] });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
