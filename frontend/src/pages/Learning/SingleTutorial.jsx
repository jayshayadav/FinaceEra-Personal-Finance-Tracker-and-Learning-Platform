

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// export default function SingleTutorial() {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");

//   const [tutorial, setTutorial] = useState(null);
//   const [completed, setCompleted] = useState(false);

//   useEffect(() => {
//     fetchTutorial();
//     fetchProgress();
//   }, [id]);

//   const fetchTutorial = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/tutorials/${id}`
//     );
//     setTutorial(res.data);
//   };

//   const fetchProgress = async () => {
//     const res = await axios.get(
//       "http://localhost:5000/api/learning-progress",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const found = res.data.find((p) => p.tutorial === id);
//     setCompleted(found?.completed || false);
//   };

//   const toggleComplete = async () => {
//     await axios.post(
//       `http://localhost:5000/api/learning-progress/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setCompleted(!completed);
//   };

//   if (!tutorial) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">

//       <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>

//       <div className="prose max-w-none mb-6">
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           rehypePlugins={[rehypeRaw]}
//         >
//           {tutorial.content}
//         </ReactMarkdown>
//       </div>

//       <button
//         onClick={toggleComplete}
//         className={`px-6 py-2 rounded text-white ${
//           completed ? "bg-red-500" : "bg-green-600"
//         }`}
//       >
//         {completed ? "Mark as Incomplete" : "Mark as Complete"}
//       </button>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function SingleTutorial() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [tutorial, setTutorial] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTutorial();
    fetchProgress();
  }, [id]);

  const fetchTutorial = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/tutorials/${id}`
    );
    setTutorial(res.data);
  };

  const fetchProgress = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/learning-progress",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const found = res.data.find((p) => p.tutorial === id);
    setCompleted(found?.completed || false);
  };

  const toggleComplete = async () => {
    await axios.post(
      `http://localhost:5000/api/learning-progress/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCompleted(!completed);
  };

  if (!tutorial)
    return (
      <p className="p-6 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto p-6 rounded shadow
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100"
      >
        <h1 className="text-3xl font-bold mb-4">
          {tutorial.title}
        </h1>

        {/* MARKDOWN CONTENT */}
        <article className="prose dark:prose-invert max-w-none mb-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {tutorial.content}
          </ReactMarkdown>
        </article>

        <button
          onClick={toggleComplete}
          className={`px-6 py-2 rounded text-white transition ${
            completed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}
