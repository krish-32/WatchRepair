import React, { useState } from "react";
import { Search } from "lucide-react";
import WatchCard from "./WatchCard";

const WatchList = ({ watches, onViewDetails }) => {
  const [activeTab, setActiveTab] = useState("repaired");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatches = watches.filter((watch) => {
    const matchesTab = watch.status === activeTab;
    const matchesSearch =
      searchTerm === "" ||
      watch.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      watch.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const repairedCount = watches.filter((w) => w.status === "repaired").length;
  const pendingCount = watches.filter((w) => w.status === "pending").length;

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-lg">
        <h1 className="font-bold mb-2">Watch Mart</h1>
        <p className="text-red-200">Professional Watch Management System</p>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("repaired")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "repaired"
                    ? "bg-red-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Repaired Watches ({repairedCount})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "pending"
                    ? "bg-red-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pending ({pendingCount})
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search watches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                />
              </div>
              <button className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>

        {filteredWatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No watches found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : `No ${activeTab} watches available`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
