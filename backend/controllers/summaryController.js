const Expense = require("../models/Expense");

// exports.getSummary = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user: req.user.id });

//     let totalIncome = 0;
//     let totalExpense = 0;

//     expenses.forEach((item) => {
//       if (item.category === "Income") totalIncome += item.amount;
//       else totalExpense += item.amount;
//     });

//     const balance = totalIncome - totalExpense;

//     res.json({
//       balance,
//       totalIncome,
//       totalExpense
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error", error: err.message });
//   }
// };


exports.getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else if (item.type === "expense") {
        totalExpense += item.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.json({
      balance,
      totalIncome,
      totalExpense
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
