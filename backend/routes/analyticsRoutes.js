const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { categorySummary, monthlySummary, balanceTrend } = require("../controllers/analyticsController");

router.get("/category", auth, categorySummary);
router.get("/monthly", auth, monthlySummary);
router.get("/balance-trend", auth, balanceTrend);

module.exports = router;
