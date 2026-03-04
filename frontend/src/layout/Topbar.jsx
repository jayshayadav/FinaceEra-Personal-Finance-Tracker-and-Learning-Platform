// import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
// import { useTheme } from "../context/ThemeContext";

// export default function Topbar({ setMobileOpen }) {
//   const themeContext = useTheme();

//   // 🛑 SAFETY CHECK (VERY IMPORTANT)
//   if (!themeContext) return null;

//   const { theme, toggleTheme } = themeContext;

//   return (
//     <div className="flex justify-between items-center px-5 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700">

//       <button
//         className="md:hidden"
//         onClick={() => setMobileOpen((prev) => !prev)}
//       >
//         ☰
//       </button>

//       <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
//         FinanceEra
//       </h1>

//       <button
//         onClick={toggleTheme}
//         className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//       >
//         {theme === "dark" ? (
//           <SunIcon className="h-5 w-5 text-yellow-400" />
//         ) : (
//           <MoonIcon className="h-5 w-5 text-gray-800" />
//         )}
//       </button>
//     </div>
//   );
// }



// import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
// import { useTheme } from "../context/ThemeContext";

// export default function Topbar({ setMobileOpen }) {
//   const themeContext = useTheme();

//   if (!themeContext) return null; // 🛑 safety

//   const { theme, toggleTheme } = themeContext;

//   return (
//     <div className="flex justify-between items-center px-5 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700">

//       <button
//         className="md:hidden"
//         onClick={() => setMobileOpen(prev => !prev)}
//       >
//         ☰
//       </button>

//       <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
//         FinanceEra
//       </h1>

      

//       <button
//         onClick={toggleTheme}
//         className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//       >
//         {theme === "dark" ? (
//           <SunIcon className="h-5 w-5 text-yellow-400" />
//         ) : (
//           <MoonIcon className="h-5 w-5 text-gray-800" />
//         )}
//       </button>
//     </div>
//   );
// }









import useTheme from "../hooks/useTheme";

export default function Topbar() {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-5 py-3.5  bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">

      <h1 className="text-lg font-bold text-gray-800 dark:text-white">
       Welcome to FinanceEra
      </h1>

      <button
        onClick={toggleTheme}
        className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition"
      >
        🌙 / ☀️
      </button>
    </div>
  );
}
