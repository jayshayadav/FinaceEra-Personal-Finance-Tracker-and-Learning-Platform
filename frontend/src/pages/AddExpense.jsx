import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses/add",
        { title, amount, category, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg); // dynamic message (income added / expense added)
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-container">
      <h2>Add Income / Expense</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddExpense;
