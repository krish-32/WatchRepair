import React from "react";
import { FolderKanban, Plus } from "lucide-react";

const Navigation = ({ activeSection, onSectionChange }) => {
  const navItems = [
    {
      id: "view",
      label: "Manage repairs",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    { id: "add", label: "Add Watch", icon: <Plus className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed h-full bg-gradient-to-b from-red-900 to-red-950 text-white w-64 min-h-screen p-6 shadow-2xl">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSectionChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2 ${
                activeSection === item.id
                  ? "bg-red-700 text-white shadow-lg transform scale-105"
                  : "text-red-100 hover:bg-red-800 hover:text-white hover:transform hover:scale-102"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
