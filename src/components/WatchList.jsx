import React, { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import WatchCard from "./WatchCard";
import Loader from "./Loading/Loading";
import axios from "axios";

const WatchList = ({ APIUrl, onViewDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [watches, setWatches] = useState([]);
  const [repairedCount, setRepairedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveryCount, setDeliveryCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    //console.log(activeTab);

    const fetchWatches = async () => {
      const watchData = await axios.get(
        `${APIUrl}/watch-list/?list=${activeTab}&&searchText=${searchTerm}`
      );

      setWatches(watchData.data.watches);
      setRepairedCount(watchData.data.repairedCount);
      setPendingCount(watchData.data.pendingCount);
      setDeliveryCount(watchData.data.deliveryCount);
    };
    fetchWatches();
    setIsLoading(false);
  }, [activeTab, searchText]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Manage repairs</h1>
          <p className="text-red-200">Professional Watch Management System</p>
        </div>

        <div className="pt-2">
          <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Tab Buttons */}
              <div className="flex gap-2 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab("delivered")}
                  className={`px-2.5 lg:px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${
                    activeTab === "delivered"
                      ? "bg-red-900 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Delivered Watches ({deliveryCount})
                </button>
                <button
                  onClick={() => setActiveTab("repaired")}
                  className={`px-2.5 lg:px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${
                    activeTab === "repaired"
                      ? "bg-red-900 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Repaired Watches ({repairedCount})
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-2.5 lg:px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${
                    activeTab === "pending"
                      ? "bg-red-900 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Pending Repairs({pendingCount})
                </button>
              </div>

              {/* Responsive Search Bar */}
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden w-full lg:max-w-md">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search watches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  onClick={() => setSearchText(searchTerm.trim().toLowerCase())}
                  className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 flex items-center justify-center transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {watches.length === 0 ? (
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
              {watches.map((watch, index) => (
                <WatchCard
                  key={index}
                  watch={watch}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchList;
