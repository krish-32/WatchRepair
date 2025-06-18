import React from "react";
import { ArrowLeft, Calendar, Settings, Wrench } from "lucide-react";

const WatchDetail = ({ watch, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-xl">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-4 text-red-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to List</span>
        </button>
        <h1 className="text-3xl font-bold">
          {watch.brand} {watch.model}
        </h1>
        <p className="text-red-200">Detailed View</p>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={watch.image}
                alt={`${watch.brand} ${watch.model}`}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {watch.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ${watch.price.toLocaleString()}
                </h2>
                <div
                  className={`px-4 py-2 rounded-full font-semibold ${
                    watch.status === "repaired"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {watch.status === "repaired"
                    ? "Repair Completed"
                    : "Repair In Progress"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Brand
                  </label>
                  <p className="text-gray-900 font-semibold">{watch.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Model
                  </label>
                  <p className="text-gray-900 font-semibold">{watch.model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Year
                  </label>
                  <p className="text-gray-900 font-semibold">{watch.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Condition
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {watch.condition}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Movement
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {watch.movement}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Diameter
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {watch.diameter}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-red-600" />
                Technical Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serial Number</span>
                  <span className="font-mono text-gray-900">
                    {watch.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Case Material</span>
                  <span className="text-gray-900">{watch.caseMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Movement Type</span>
                  <span className="text-gray-900">{watch.movement}</span>
                </div>
              </div>
            </div>

            {watch.status === "repaired" && watch.repairDate && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Repair Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-green-800">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Completed on{" "}
                      {new Date(watch.repairDate).toLocaleDateString()}
                    </span>
                  </div>
                  {watch.repairNotes && (
                    <div>
                      <span className="text-sm font-medium text-green-700">
                        Repair Notes:
                      </span>
                      <p className="text-green-800 mt-1">{watch.repairNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetail;
