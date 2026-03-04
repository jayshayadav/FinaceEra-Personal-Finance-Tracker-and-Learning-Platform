const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");

// 1. Total Expense
router.get("/total", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 2. Current Month Expense
router.get("/month", auth, async (req, res) => {
  try {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: start }
    });

    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    res.json({ monthTotal: total });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 3. Category-wise Expense
router.get("/category", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });

    const categoryData = {};

    expenses.forEach((exp) => {
      categoryData[exp.category] = (categoryData[exp.category] || 0) + exp.amount;
    });

    res.json({ categoryData });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 4. Recent 5 Transactions
router.get("/recent", auth, async (req, res) => {
  try {
    const recent = await Expense.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    res.json({ recent });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
