const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;

    if (!type) {
      return res.status(400).json({ msg: "Type required" });
    }

    const msgText = type === "income" ? "Income Added" : "Expense Added";

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      type
    });

    res.status(201).json({ msg: msgText, expense });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};




// GET ALL EXPENSES
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
