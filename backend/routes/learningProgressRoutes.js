const express = require("express");
const auth = require("../middleware/authMiddleware");
const LearningProgress = require("../models/LearningProgress");

const router = express.Router();

// Toggle complete / incomplete
router.post("/:tutorialId", auth, async (req, res) => {
  const { tutorialId } = req.params;

  let progress = await LearningProgress.findOne({
    user: req.user.id,
    tutorial: tutorialId,
  });

  if (progress) {
    progress.completed = !progress.completed;
    await progress.save();
  } else {
    progress = await LearningProgress.create({
      user: req.user.id,
      tutorial: tutorialId,
      completed: true,
    });
  }

  res.json(progress);
});

// Get user progress
router.get("/", auth, async (req, res) => {
  const progress = await LearningProgress.find({ user: req.user.id });
  res.json(progress);
});

module.exports = router;
