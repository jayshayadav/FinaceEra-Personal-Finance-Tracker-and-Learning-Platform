const Expense = require("../models/Expense");

// Category-wise expense aggregation (for Pie/Doughnut)
exports.categorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Expense.aggregate([
      { $match: { user: require("mongoose").Types.ObjectId(userId) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]);

    // return { category: total }
    const formatted = result.map(r => ({ category: r._id, total: r.total }));
    res.json({ data: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Monthly income vs expense for last 12 months (Bar)
exports.monthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const result = await Expense.aggregate([
      { $match: { user: require("mongoose").Types.ObjectId(userId), date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // build months array and map
    const months = [];
    const incomes = {};
    const expenses = {};

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()+1}`;
      months.push({ key, label: d.toLocaleString("default", { month: "short", year: "numeric" }) });
      incomes[key] = 0;
      expenses[key] = 0;
    }

    result.forEach(row => {
      const { year, month, type } = row._id;
      const key = `${year}-${month}`;
      if (type === "income") incomes[key] = (incomes[key] || 0) + row.total;
      else expenses[key] = (expenses[key] || 0) + row.total;
    });

    const labels = months.map(m => m.label);
    const incomeData = months.map(m => incomes[m.key] || 0);
    const expenseData = months.map(m => expenses[m.key] || 0);

    res.json({ labels, incomeData, expenseData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Total balance trend (cumulative) - optional line chart
exports.balanceTrend = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get transactions in last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);

    const tx = await Expense.find({ user: userId, date: { $gte: thirtyDaysAgo } }).sort({ date: 1 });

    // Build day-wise cumulative
    const map = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo.getFullYear(), thirtyDaysAgo.getMonth(), thirtyDaysAgo.getDate() + i);
      const key = d.toISOString().substring(0,10);
      map[key] = 0;
    }

    tx.forEach(t => {
      const key = t.date.toISOString().substring(0,10);
      map[key] = (map[key] || 0) + (t.type === "income" ? Number(t.amount) : -Number(t.amount));
    });

    const labels = Object.keys(map);
    const values = [];
    let cum = 0;
    labels.forEach(k => {
      cum += map[k];
      values.push(cum);
    });

    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
