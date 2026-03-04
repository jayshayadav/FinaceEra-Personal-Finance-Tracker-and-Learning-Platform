// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex bg-gray-100">
//       <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

//       <div className="flex-1 md:ml-64 ml-20 min-h-screen">
//         <Topbar setMobileOpen={setMobileOpen} />

//         <div className="p-4 md:p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* SIDEBAR */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:ml-64 ml-20">
        <Topbar setMobileOpen={setMobileOpen} />

        {/* 🔥 PAGE CONTENT */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
