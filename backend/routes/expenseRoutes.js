const express = require("express");
const auth = require("../middleware/authMiddleware");
const { addExpense, getExpenses } = require("../controllers/expenseController");

const router = express.Router();

// ADD EXPENSE
router.post("/add", auth, addExpense);

// GET ALL EXPENSES
router.get("/", auth, getExpenses);

module.exports = router;
