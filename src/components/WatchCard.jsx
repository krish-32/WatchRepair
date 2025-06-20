import React from "react";
import { Calendar, Wallet, Wallet2, Wrench, Tag } from "lucide-react";

const WatchCard = ({ watch, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={
            watch?.image?.length === 0
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UY8Ro4mEwVwM92JAedCKKOdm_Ey6wvxvvQ&s"
              : watch?.image[0]
          }
          alt={`${watch?.watch_name} ${watch?.model_no}`}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
            watch?.hasRepair
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {watch?.hasRepair ? "Completed" : "In Progress"}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            {watch?.watch_name} {watch?.model_no}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Delivery:{" "}
            {new Date(watch.date?.seconds * 1000).toLocaleDateString()} •
            <Wallet2 className="w-4 h-4 ml-2 text-gray-400" />
            Balance: ₹{watch.balance_to_pay}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-gray-500" />
          {watch.nature_of_repair.length > 0
            ? watch.nature_of_repair?.join(", ")
            : watch?.issue_description || "No description provided"}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <Wallet className="w-5 h-5" />₹{watch?.amount?.toLocaleString()}
          </span>
          <button
            onClick={() => onViewDetails(watch)}
            className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
