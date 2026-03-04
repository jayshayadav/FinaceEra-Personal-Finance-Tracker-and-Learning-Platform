const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const summaryRoutes = require("./routes/summaryRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/summary", summaryRoutes);
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/tutorials", require("./routes/tutorialRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));

app.use("/api/learning-progress", require("./routes/learningProgressRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/target", require("./routes/targetRoutes"));




app.get("/", (req, res) => {
  res.send("FinanceEra Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
