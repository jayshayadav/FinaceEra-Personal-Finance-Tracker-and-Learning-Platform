const express = require("express");
const Progress = require("../models/Progress");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/:tutorialId", auth, async (req, res) => {
  const { completed } = req.body;

  let progress = await Progress.findOne({
    user: req.user.id,
    tutorial: req.params.tutorialId,
  });

  if (progress) {
    progress.completed = completed;
    await progress.save();
  } else {
    progress = await Progress.create({
      user: req.user.id,
      tutorial: req.params.tutorialId,
      completed,
    });
  }

  res.json(progress);
});

router.get("/", auth, async (req, res) => {
  const progress = await Progress.find({ user: req.user.id });
  res.json(progress);
});

module.exports = router;
