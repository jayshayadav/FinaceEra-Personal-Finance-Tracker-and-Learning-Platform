// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function LearningList() {
//   const [tutorials, setTutorials] = useState([]);
//   const [progress, setProgress] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const tuts = await axios.get("http://localhost:5000/api/tutorials");
//     const prog = await axios.get("http://localhost:5000/api/learning-progress", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setTutorials(tuts.data);
//     setProgress(prog.data);
//   };

//   const completedCount = progress.filter((p) => p.completed).length;
//   const percentage = tutorials.length
//     ? Math.round((completedCount / tutorials.length) * 100)
//     : 0;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Increase Your Financial Knowledge</h1>

//       {/* PROGRESS BAR */}
//       <div className="mb-6">
//         <div className="w-full bg-gray-200 rounded h-3">
//           <div
//             className="bg-green-500 h-3 rounded"
//             style={{ width: `${percentage}%` }}
//           ></div>
//         </div>
//         <p className="text-sm mt-1">{percentage}% Completed</p>
//       </div>

//       {/* TOPIC LIST */}
//       <div className="space-y-3">
//         {tutorials.map((t) => (
//           <Link
//             key={t._id}
//             to={`/tutorial/${t._id}`}
//             className="block p-4 bg-white shadow rounded hover:bg-gray-50"
//           >
//             {t.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LearningList() {
  const [tutorials, setTutorials] = useState([]);
  const [progress, setProgress] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tuts = await axios.get("http://localhost:5000/api/tutorials");
    const prog = await axios.get(
      "http://localhost:5000/api/learning-progress",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setTutorials(tuts.data);
    setProgress(prog.data);
  };

  const completedCount = progress.filter((p) => p.completed).length;
  const percentage = tutorials.length
    ? Math.round((completedCount / tutorials.length) * 100)
    : 0;

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Increase Your Financial Knowledge
      </h1>

      {/* PROGRESS BAR */}
      <div className="mb-6">
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-3">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
          {percentage}% Completed
        </p>
      </div>

      {/* TOPIC LIST */}
      <div className="space-y-3">
        {tutorials.map((t) => (
          <Link
            key={t._id}
            to={`/tutorial/${t._id}`}
            className="block p-4 rounded shadow
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              hover:bg-gray-50 dark:hover:bg-gray-700
              transition"
          >
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
