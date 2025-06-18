import React from "react";
import { Clock } from "lucide-react";

const Navigation = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: "view", label: "View Items" },
    { id: "add", label: "Add Items" },
  ];

  return (
    <nav className="fixed h-full bg-gradient-to-b from-red-900 to-red-950 text-white w-64 min-h-screen p-6 shadow-2xl">
      {/* <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="w-8 h-8 text-red-400" />
          <h1 className="text-2xl font-bold">
            <span className="text-red-400">Tital</span>
          </h1>
        </div>
        <p className="text-red-200 text-sm">Watch Management System</p>
      </div> */}

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSectionChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                activeSection === item.id
                  ? "bg-red-700 text-white shadow-lg transform scale-105"
                  : "text-red-100 hover:bg-red-800 hover:text-white hover:transform hover:scale-102"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
