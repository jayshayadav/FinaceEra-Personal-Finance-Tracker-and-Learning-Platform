
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import { useLocation } from "react-router-dom";

// export default function Dashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const token = localStorage.getItem("token");
//   const location = useLocation();

//   useEffect(() => {
//     fetchExpenses();
//   }, [location.pathname]); // ✅ route change pe refresh

//   const fetchExpenses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/expenses", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setExpenses(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   /* ================= CALCULATIONS ================= */

//   const totalIncome = expenses
//     .filter((e) => e.type === "income")
//     .reduce((sum, cur) => sum + Number(cur.amount), 0);

//   const totalExpense = expenses
//     .filter((e) => e.type === "expense")
//     .reduce((sum, cur) => sum + Number(cur.amount), 0);

//   const balance = totalIncome - totalExpense;

//   /* ================= RECENT TRANSACTIONS FIX ================= */

//   const recentTransactions = [...expenses]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);

//   /* ================= CATEGORY TOTALS ================= */

//   const categoryTotals = {};
//   expenses.forEach((e) => {
//     if (!categoryTotals[e.category]) {
//       categoryTotals[e.category] = { income: 0, expense: 0 };
//     }
//     categoryTotals[e.category][e.type] += Number(e.amount);
//   });

//   const expenseChartData = Object.entries(categoryTotals)
//     .filter(([_, val]) => val.expense > 0)
//     .map(([cat, val]) => ({ name: cat, value: val.expense }));

//   const incomeChartData = Object.entries(categoryTotals)
//     .filter(([_, val]) => val.income > 0)
//     .map(([cat, val]) => ({ name: cat, value: val.income }));


//   const COLORS = [
//     "#60A5FA",
//     "#34D399",
//     "#F87171",
//     "#FBBF24",
//     "#A78BFA",
//     "#F97316",
//   ];

//   return (
//     <div
//       className="min-h-screen p-4 md:p-8  
//                  bg-gray-100 dark:bg-gray-900
//                  text-gray-800 dark:text-gray-100
//                  transition-colors"
//     >
//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card title="Total Balance" value={`₹${balance}`} />
//         <Card title="Credit" value={`₹${totalIncome}`} color="text-green-500" />
//         <Card title="Debit" value={`₹${totalExpense}`} color="text-red-500" />
//       </div>

//       {/* CONTENT GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

//         {/* RECENT TRANSACTIONS */}
// <Section title="Recent Transactions">
//   <div className="space-y-3">

//     {recentTransactions.length === 0 && (
//       <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
//         No transactions yet
//       </p>
//     )}

//     {recentTransactions.map((item) => (
//       <div
//         key={item._id}
//         className="flex items-center justify-between
//                    border-b border-gray-200 dark:border-gray-700
//                    pb-2 last:border-none"
//       >
//         {/* Left */}
//         <div className="flex flex-col">
//           <span className="font-medium text-gray-800 dark:text-gray-100">
//             {item.title}
//           </span>
//           {/* <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
//             {item.type}
//           </span> */}
//         </div>

//         {/* Right */}
//         <span
//           className={`font-semibold text-lg ${
//             item.type === "income"
//               ? "text-green-500"
//               : "text-red-500"
//           }`}
//         >
//           {item.type === "income" ? "+" : "-"}₹{item.amount}
//         </span>
//       </div>
//     ))}

   
//   </div>
// </Section>


//         {/* EXPENSE CHART */}
//         <Section title="Expenses by Category">
//           <Chart data={expenseChartData} colors={COLORS} />
//         </Section>

//         {/* INCOME CHART */}
//         <Section title="Income by Category">
//           <Chart data={incomeChartData} colors={COLORS} />
//         </Section>
        
//       </div>
//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */

// function Card({ title, value, color = "" }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow transition-colors">
//       <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
//       <p className={`text-3xl font-bold ${color}`}>{value}</p>
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
//       <h3 className="font-bold mb-4">{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Chart({ data, colors }) {
//   return (
//     <ResponsiveContainer width="100%" height={200}>
//       <PieChart>
//         <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
//           {data.map((_, i) => (
//             <Cell key={i} fill={colors[i % colors.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );

// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [targetIncome, setTargetIncome] = useState(0);
  const [targetExpense, setTargetExpense] = useState(0);

  const token = localStorage.getItem("token");
  const location = useLocation();

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchExpenses();
    fetchTargets();
  }, [location.pathname]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTargets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/target", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTargetIncome(res.data?.targetIncome || 0);
      setTargetExpense(res.data?.targetExpense || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const saveTargets = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/target",
        {
          targetIncome: Number(targetIncome),
          targetExpense: Number(targetExpense),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Targets Saved");
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= CALCULATIONS ================= */

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, cur) => sum + Number(cur.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, cur) => sum + Number(cur.amount), 0);

  const balance = totalIncome - totalExpense;

  const incomePercent =
    targetIncome > 0
      ? Math.min((totalIncome / targetIncome) * 100, 100)
      : 0;

  const expensePercent =
    targetExpense > 0
      ? Math.min((totalExpense / targetExpense) * 100, 100)
      : 0;

  const incomeColor = () => {
    if (incomePercent < 30) return "bg-red-500";
    if (incomePercent < 80) return "bg-yellow-400";
    return "bg-green-500";
  };

  const expenseColor = () => {
    if (expensePercent < 50) return "bg-green-500";
    if (expensePercent < 80) return "bg-yellow-400";
    return "bg-red-500";
  };

  /* ================= PDF ================= */

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.text("Monthly Report", 14, 15);
    doc.text(`Target Income: ₹${targetIncome}`, 14, 25);
    doc.text(`Target Expense: ₹${targetExpense}`, 14, 32);

    const rows = expenses.map((e) => [
      e.title,
      e.category,
      e.type,
      `₹${e.amount}`,
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["Title", "Category", "Type", "Amount", "Date"]],
      body: rows,
      startY: 40,
    });

    doc.save("report.pdf");
  };

  /* ================= CHART DATA ================= */

  const categoryTotals = {};
  expenses.forEach((e) => {
    if (!categoryTotals[e.category]) {
      categoryTotals[e.category] = { income: 0, expense: 0 };
    }
    categoryTotals[e.category][e.type] += Number(e.amount);
  });

  const expenseChartData = Object.entries(categoryTotals)
    .filter(([_, v]) => v.expense > 0)
    .map(([k, v]) => ({ name: k, value: v.expense }));

  const incomeChartData = Object.entries(categoryTotals)
    .filter(([_, v]) => v.income > 0)
    .map(([k, v]) => ({ name: k, value: v.income }));

  const COLORS = [
    "#60A5FA",
    "#34D399",
    "#F87171",
    "#FBBF24",
    "#A78BFA",
    "#F97316",
  ];

  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  /* ================= UI ================= */

  return (
    // <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">

    //   {/* SUMMARY */}
    //   <div className="grid md:grid-cols-3 gap-4 mb-4">
    //     <Card title="Balance" value={`₹${balance}`} />
    //     <Card title="Income" value={`₹${totalIncome}`} color="text-green-500"/>
    //     <Card title="Expense" value={`₹${totalExpense}`} color="text-red-500"/>
    //   </div>

    //   <div className="grid lg:grid-cols-2 gap-4">

        
       

    //     {/* RECENT */}
    //     <Section title="Recent Transactions">
    //       {recentTransactions.map((t)=>(
    //         <div key={t._id} className="flex justify-between border-b py-1">
    //           <span>{t.title}</span>
    //           <span className={t.type==="income"?"text-green-500":"text-red-500"}>
    //             ₹{t.amount}
    //           </span>
    //         </div>
    //       ))}
    //     </Section>

    //     {/* CHARTS */}
    //     <Section title="Expenses">
    //       <Chart data={expenseChartData} colors={COLORS}/>
    //     </Section>

    //     <Section title="Income">
    //       <Chart data={incomeChartData} colors={COLORS}/>
    //     </Section>

    

    //      <Section title="Monthly Target">

    //       <div className="grid grid-cols-2 gap-2">
    //         <input
    //           type="number"
    //           value={targetIncome}
    //           onChange={(e)=>setTargetIncome(e.target.value)}
    //           placeholder="Target Income"
    //           className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    //         />

    //         <input
    //           type="number"
    //           value={targetExpense}
    //           onChange={(e)=>setTargetExpense(e.target.value)}
    //           placeholder="Target Expense"
    //           className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    //         />
    //       </div>

    //       <button
    //         onClick={saveTargets}
    //         className="mt-2 w-full bg-green-600 text-white py-2 rounded"
    //       >
    //         Save
    //       </button>

    //       {/* INCOME BAR */}
    //       <p className="mt-3 text-sm">Income {incomePercent.toFixed(1)}%</p>
    //       <div className="bg-gray-300 h-4 rounded">
    //         <div
    //           className={`h-4 rounded ${incomeColor()}`}
    //           style={{ width: `${incomePercent}%` }}
    //         />
    //       </div>

    //       {/* EXPENSE BAR */}
    //       <p className="mt-2 text-sm">Expense {expensePercent.toFixed(1)}%</p>
    //       <div className="bg-gray-300 h-4 rounded">
    //         <div
    //           className={`h-4 rounded ${expenseColor()}`}
    //           style={{ width: `${expensePercent}%` }}
    //         />
    //       </div>

    <div
      className="min-h-screen p-4 md:p-8  
                 bg-gray-100 dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 transition-colors"
    >
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Balance" value={`₹${balance}`} />
        <Card title="Credit" value={`₹${totalIncome}`} color="text-green-500" />
        <Card title="Debit" value={`₹${totalExpense}`} color="text-red-500" />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 ">

        {/* RECENT TRANSACTIONS */}
<Section title="Recent Transactions">
  <div className="space-y-3">

    {recentTransactions.length === 0 && (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
        No transactions yet
      </p>
    )}

    {recentTransactions.map((item) => (
      <div
        key={item._id}
        className="flex items-center justify-between
                   border-b border-gray-200 dark:border-gray-700
                   pb-2 last:border-none"
      >
        {/* Left */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {item.title}
          </span>
        </div>

        {/* Right */}
        <span
          className={`font-semibold text-lg ${
            item.type === "income"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {item.type === "income" ? "+" : "-"}₹{item.amount}
        </span>
      </div>
    ))}

   
  </div>
</Section>



{/* Monthly Target*/}

         <Section title="Monthly Target">
          
<div className="text-sm flex gap-x-41">
  <span>Expense Target</span>
  <span>Income Target</span>
</div>


          <div className="grid grid-cols-2 gap-2">
             <input
              type="number"
              value={targetIncome}
              onChange={(e)=>setTargetIncome(e.target.value)}
              placeholder="Target Income"
              className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            />

             <input
              type="number"
              value={targetExpense}
              onChange={(e)=>setTargetExpense(e.target.value)}
              placeholder="Target Expense"
              className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <button
            onClick={saveTargets}
            className="mt-2 w-full bg-green-600 text-white py-2 rounded"
          >
            Save
          </button>

          {/* INCOME BAR */}
          <p className="mt-3 text-sm">Income {incomePercent.toFixed(1)}%</p>
          <div className="bg-gray-300 h-4 rounded">
            <div
              className={`h-4 rounded ${incomeColor()}`}
              style={{ width: `${incomePercent}%` }}
            />
          </div>

          {/* EXPENSE BAR */}
          <p className="mt-2 text-sm">Expense {expensePercent.toFixed(1)}%</p>
          <div className="bg-gray-300 h-4 rounded">
            <div
              className={`h-4 rounded ${expenseColor()}`}
              style={{ width: `${expensePercent}%` }}
            />
          </div>


          <button
            onClick={downloadReport}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
          >
            Download Report
          </button>

        </Section>


        {/* EXPENSE CHART */}
        <Section title="Expenses by Category">
          <Chart data={expenseChartData} colors={COLORS} />
        </Section>

        {/* INCOME CHART */}
        <Section title="Income by Category">
          <Chart data={incomeChartData} colors={COLORS} />
        </Section>
        
     

      </div>
    </div>
 );
}

/* COMPONENTS */

function Card({title,value,color=""}){
  return(
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3>{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function Section({title,children}){
  return(
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  )
}

function Chart({data,colors}){
  return(
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((_,i)=>(
            <Cell key={i} fill={colors[i%colors.length]} />
          ))}
        </Pie>
        <Tooltip/>
      </PieChart>
    </ResponsiveContainer>
  )
}
