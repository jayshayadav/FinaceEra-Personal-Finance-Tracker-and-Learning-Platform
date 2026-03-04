const express = require("express");
const router = express.Router();
const Target = require("../models/Targett");
const auth = require("../middleware/authMiddleware");

/* ================= GET TARGET ================= */

router.get("/", auth, async (req, res) => {
  try {

    const month = new Date().toISOString().slice(0,7);

    const target = await Target.findOne({
      userId: req.user.id,
      month,
    });

    res.json(target || {});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ================= SAVE TARGET ================= */

router.post("/", auth, async (req, res) => {
  try {

    const month = new Date().toISOString().slice(0,7);

    const { targetIncome, targetExpense } = req.body;

    const updated = await Target.findOneAndUpdate(
      { userId: req.user.id, month },
      {
        userId: req.user.id,
        month,
        targetIncome,
        targetExpense,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
