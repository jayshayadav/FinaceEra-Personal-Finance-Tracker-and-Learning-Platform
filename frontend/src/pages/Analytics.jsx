import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from "chart.js";
import "../styles/analytics.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

export default function Analytics() {
  const token = localStorage.getItem("token");

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyLabels, setMonthlyLabels] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [trendLabels, setTrendLabels] = useState([]);
  const [trendValues, setTrendValues] = useState([]);

  useEffect(() => {
    fetchCategory();
    fetchMonthly();
    fetchTrend();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics/category", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategoryData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMonthly = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics/monthly", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMonthlyLabels(res.data.labels || []);
      setMonthlyIncome(res.data.incomeData || []);
      setMonthlyExpense(res.data.expenseData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrend = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics/balance-trend", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrendLabels(res.data.labels || []);
      setTrendValues(res.data.values || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Pie data
  const pieData = {
    labels: categoryData.map(c => c.category),
    datasets: [
      {
        label: "Category wise",
        data: categoryData.map(c => c.total),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71", "#E67E22", "#95A5A6"
        ],
        hoverOffset: 6
      }
    ]
  };

  // Bar data
  const barData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Income",
        data: monthlyIncome,
        backgroundColor: "rgba(54,162,235,0.7)"
      },
      {
        label: "Expense",
        data: monthlyExpense,
        backgroundColor: "rgba(255,99,132,0.7)"
      }
    ]
  };

  const lineData = {
    labels: trendLabels,
    datasets: [
      {
        label: "Balance Trend",
        data: trendValues,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76,175,80,0.2)",
        tension: 0.2,
        fill: true
      }
    ]
  };

  return (
    <div className="analytics-page">
      <h2>FinanceEra Analytics (Pro)</h2>

      <div className="charts-grid">
        <div className="card chart-card">
          <h3>Category-wise (Expenses)</h3>
          <Pie data={pieData} />
        </div>

        <div className="card chart-card">
          <h3>Monthly Income vs Expense (Last 12 months)</h3>
          <Bar data={barData} />
        </div>

        <div className="card chart-card full-width">
          <h3>Balance Trend (Last 30 days)</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}
