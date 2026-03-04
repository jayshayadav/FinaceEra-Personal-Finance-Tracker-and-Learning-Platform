
import { NavLink } from "react-router-dom";
import logo from "../assets/FinanceEra_Logo.png";

import {
  HomeIcon,
  CreditCardIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      name: "Transactions",
      path: "/add",
      icon: <CreditCardIcon className="h-6 w-6" />,
    },
    {
      name: "Learning",
      path: "/learning",
      icon: <BookOpenIcon className="h-6 w-6" />,
    },
    {
      name: "Account",
      path: "/accounts",
      icon: <BanknotesIcon className="h-6 w-6" />,
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed z-30 top-0 left-0 h-full transition-all duration-300
        ${mobileOpen ? "w-64" : "w-20"} md:w-64
        bg-blue-600 dark:bg-gray-800 text-white`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/20 dark:border-gray-700">
        
       <span className="text-3xl"><img src={logo} alt="FinanceEra_logo" className="h-9"  /></span>
        <span className="text-xl font-bold hidden md:block"> FinanceEra</span>
        </div>

        {/* NAV ITEMS */}
        <nav className="mt-5 flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 text-sm rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-500 dark:bg-gray-700" : "hover:bg-blue-500/40 dark:hover:bg-gray-700/60"
                }`
              }
            >
              {item.icon}
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
