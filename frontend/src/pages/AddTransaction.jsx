// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddTransaction.css";

// function AddTransaction() {
//   const [type, setType] = useState("expense");
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/expenses/add",
//         { title, amount, category, type },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert(res.data.msg);
//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err);
//       alert("Error adding transaction");
//     }
//   };

//   return (
//     <div >
//       <h1>Add Transaction</h1>

//       {/* Income / Expense Toggle */}
//       <div className="toggle-type">
//         <button
//           className={type === "income" ? "active" : ""}
//           onClick={() => setType("income")}
//         >
//           Income
//         </button>
//         <button
//           className={type === "expense" ? "active" : ""}
//           onClick={() => setType("expense")}
//         >
//           Expense
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           placeholder="Title"
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />

//         <button type="submit" className="submit-btn">
//           Add {type}
//         </button>

//       </form>
//     </div>
//   );
// }

// export default AddTransaction;




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses/add",
        { title, amount, category, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error adding transaction");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 mb-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">

      {/* Heading */}
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-white">
        Add Transaction
      </h1>

      {/* Toggle Button */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded-lg font-semibold w-32 transition 
          ${type === "income"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          Income
        </button>

        <button
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded-lg font-semibold w-32 transition 
          ${type === "expense"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          Expense
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-500 outline-none
                     dark:bg-gray-700 dark:text-white"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-500 outline-none
                     dark:bg-gray-700 dark:text-white"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-500 outline-none
                     dark:bg-gray-700 dark:text-white"
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-3 font-semibold rounded-lg text-white transition
          ${type === "income" ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"}`}
        >
          Add {type}
        </button>

      </form>
    </div>
  );
}

export default AddTransaction;
