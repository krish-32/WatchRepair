import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import WatchList from "./components/WatchList";
import WatchDetail from "./components/WatchDetail";
import AddItemForm from "./components/AddItemForm";
import { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("add");
  const [viewMode, setViewMode] = useState("add");
  const [selectedWatch, setSelectedWatch] = useState(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const APIUrl = import.meta.env.VITE_API_URL;

  // const APIUrl = "http://localhost:5000";

  const handleViewDetails = (watch) => {
    setSelectedWatch(watch);
    setViewMode("detail");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedWatch(null);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setViewMode(section === "add" ? "add" : "list");
    setIsNavOpen(false);
  };

  const handleSaveWatch = (watchData) => {
    const newWatch = {
      ...watchData,
      id: Date.now().toString(),
      repairDate:
        watchData.status === "repaired"
          ? new Date().toISOString().split("T")[0]
          : undefined,
    };
    setWatches((prev) => [...prev, newWatch]);
    setActiveSection("view");
    setViewMode("list");
  };

  const renderContent = () => {
    if (viewMode === "add") {
      return (
        <AddItemForm
          APIUrl={APIUrl}
          onBack={handleBack}
          onSave={handleSaveWatch}
        />
      );
    }
    if (viewMode === "detail" && selectedWatch) {
      return (
        <WatchDetail
          APIUrl={APIUrl}
          watch={selectedWatch}
          onBack={handleBack}
        />
      );
    }
    return <WatchList APIUrl={APIUrl} onViewDetails={handleViewDetails} />;
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="fixed top-0 inset-x-0 w-full z-50 shadow px-10 py-8 flex justify-betweem bg-gradient-to-b from-red-900 to-red-950 text-white">
        <button onClick={() => setIsNavOpen(true)}>
          <Menu className="lg:hidden w-[34px] h-[34px] text-gray-300" />
        </button>
        <h1 className="text-3xl font-semibold capitalize ml-6">Yuva Times</h1>
        <div className="w-6 h-6" /> {/* spacer for symmetry */}
      </div>

      <div className="min-h-screen flex bg-gray-100 relative mt-24">
        {/* Desktop Sidebar */}

        <div className="hidden lg:block w-64 bg-white shadow-lg">
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isNavOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="w-64 bg-white shadow-lg h-full">
              <div className="flex justify-end p-4">
                <button onClick={() => setIsNavOpen(false)}>
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <Navigation
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
            <div
              className="flex-1 bg-black opacity-30"
              onClick={() => setIsNavOpen(false)}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col mb-10">
          {/* Main Content */}
          <main className="p-4">{renderContent()}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
