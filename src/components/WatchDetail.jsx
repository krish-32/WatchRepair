import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  User,
  ArrowRight,
  Calendar,
  Settings,
  Wrench,
  Trash2,
  Phone,
  MapPin,
  Wallet,
  Wallet2,
  Tag,
  CheckCircle,
  Truck,
} from "lucide-react";
import Loader from "./Loading/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Notification/Alert";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleDateString();
};

const WatchDetail = ({ APIUrl, watch, onBack }) => {
  //console.log("WatchDetail watch:", watch);

  const [isLoading, setIsLoading] = useState(false);
  const [hasRepair, setHasRepair] = useState(watch.hasRepair);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdateStatusAlertOpen, setIsUpdateStatusAlertOpen] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const userMessage = hasRepair
    ? "Your watch still has an issue. We will fix it as soon as possible. Until then, please wait."
    : "Your watch has been repaired. Please come and collect it at your convenience. Thank you!";
  const encodedMessage = encodeURIComponent(userMessage);

  const handleWhatsApp = async () => {
    setIsLoading(true);
    const whatsappUrl = `https://wa.me/${watch.phone_no}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsUpdateStatusAlertOpen(true);
    setShowPopup(false);
    setIsLoading(false);
  };

  const handleSMS = async () => {
    setIsLoading(true);
    const smsUrl = `sms:${watch.phone_no}?body=${encodedMessage}`;
    window.open(smsUrl, "_blank");
    setIsUpdateStatusAlertOpen(true);
    setShowPopup(false);
    setIsLoading(false);
  };

  const handleToggleStatus = async () => {
    if (hasRepair) {
      try {
        await axios.patch(`${APIUrl}/${watch._id}/delivery-status`);
        toast.success("Delivery date updated successfully.");
        setTimeout(() => {
          navigate(0);
        }, 1000);
      } catch (error) {
        console.error("Failed to update delivery date:", error);
        toast.error("Failed to update delivery date.");
      }
    } else {
      setShowPopup(true);
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    setWatchId(watch._id);
    setImgId(watch?.image[0]?.split("/").slice(-1)[0].split(".")[0]);
    setIsAlertOpen(true);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    if (!watchId && !imgId) {
      console.error("Watch ID or Image ID is missing");
      setIsLoading(false);
      toast.error("Watch ID or Image ID is missing");
      setIsAlertOpen(false);
      return;
    }

    try {
      await axios.delete(`${APIUrl}/watches/${watchId}/${imgId}`);

      toast.success("Watch deleted successfully.");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.error("Error deleting watch:", error);
      return;
    }
    setIsLoading(false);
    setIsAlertOpen(false);
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
  };

  const handleRepairConfirm = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`${APIUrl}/${watch._id}/repair-status`, {
        hasRepair: !hasRepair,
      });
      setIsUpdateStatusAlertOpen(false);
      setIsLoading(false);
      toast.success("Repair status updated to 'Repaired'.");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.error("Error updating repair status:", error);
    }
  };

  const handleRepairCancel = () => {
    setIsUpdateStatusAlertOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}

      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
            <p className="text-lg font-semibold">Send message via:</p>
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              WhatsApp
            </button>
            <button
              onClick={handleSMS}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              SMS
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-500 underline mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-xl flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-x-6">
              <button
                className="relative w-14 h-14 bg-transparent border-none cursor-pointer outline-none overflow-hidden group"
                onClick={onBack}
              >
                {/* Outer ring */}
                <span className="absolute inset-[7px] rounded-full border-4 border-[#f0eeef] transition-all duration-500 group-hover:opacity-0 group-hover:scale-75"></span>

                {/* Hover ring */}
                <span className="absolute inset-[7px] rounded-full border-4 border-[#96daf0] scale-[1.3] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"></span>

                {/* Icon box */}
                <div className="absolute top-0 left-0 flex transform transition-transform duration-500 group-hover:-translate-x-14">
                  <ArrowRight className="w-5 h-5 mt-[17px] mx-[18px] rotate-180 text-[#f0eeef]" />
                  <ArrowRight className="w-5 h-5 mt-[17px] mx-[18px] rotate-180 text-[#f0eeef]" />
                </div>
              </button>
              <div>
                <h1 className="text-3xl font-bold capitalize">
                  {watch.watch_name}
                </h1>
                <p className="text-red-200 text-sm">Customer: {watch.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-2">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={
                    watch?.image?.length === 0
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UY8Ro4mEwVwM92JAedCKKOdm_Ey6wvxvvQ&s"
                      : watch?.image[0]
                  }
                  alt={watch.watch_name}
                  className="w-full h-96 object-contain"
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Repair Details
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Nature of Repair:</strong>{" "}
                  {[
                    ...(watch.nature_of_repair?.length
                      ? watch.nature_of_repair
                      : []),
                    ...(watch.issue_description
                      ? [watch.issue_description]
                      : []),
                  ].join(", ") || "No description provided"}
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  <strong>Delivery Date:</strong>{" "}
                  {formatDate(watch.delivery_date)}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    ₹{watch.amount.toLocaleString()}
                  </h2>
                  <div
                    className={`px-4 py-2 rounded-full font-semibold ${
                      hasRepair
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {hasRepair ? "Repair Completed" : "Repair In Progress"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <User className="w-4 h-4 text-gray-400" />
                      Customer Name
                    </label>
                    <p className="text-gray-900 font-semibold">{watch.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone Number
                    </label>
                    <p className="text-gray-900 font-semibold">
                      {watch.phone_no}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Address
                    </label>
                    <p className="text-gray-900 font-semibold">
                      {watch.address}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      Advance Paid
                    </label>
                    <p className="text-gray-900 font-semibold">
                      ₹{watch.advance_paid}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Wallet2 className="w-4 h-4 text-gray-400" />
                      Balance to Pay
                    </label>
                    <p className="text-gray-900 font-semibold">
                      ₹{watch.balance_to_pay}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Tag className="w-4 h-4 text-gray-400" />
                      Watch Model
                    </label>
                    <p className="text-gray-900 font-semibold">
                      {watch.model_no}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Date Booked
                    </label>
                    <p className="text-gray-900 font-semibold">
                      {formatDate(watch.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-red-600" />
                  Technical Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Watch Name</span>
                    <span className="text-gray-900">{watch.watch_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model No.</span>
                    <span className="text-gray-900">{watch.model_no}</span>
                  </div>
                </div>
              </div>

              {hasRepair && watch.delivery_date && watch.hasDelivered && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Repair Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-green-800">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Delivered on {formatDate(watch.delivery_date)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-end space-x-4">
              {!watch.hasDelivered && (
                <button
                  onClick={handleToggleStatus}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  {hasRepair ? (
                    <Truck className="w-6 h-6 mr-2" />
                  ) : (
                    <CheckCircle className="w-6 h-6 mr-2" />
                  )}

                  {hasRepair ? "Mark as Delivered" : "Mark as Repaired"}
                </button>
              )}

              <button
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg flex items-center"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <Alert
          isOpen={isAlertOpen}
          message="This action will permanently delete the watch details. Continue?"
          title={watch.watch_name}
          image={watch.image?.[0]}
          onYes={handleConfirm}
          onNo={handleCancel}
          onClose={() => setIsAlertOpen(false)}
          isLoading={isLoading}
        />

        <Alert
          isOpen={isUpdateStatusAlertOpen}
          message="Do you like to update the repair status of this watch?"
          title={watch.watch_name}
          image={watch.image?.[0]}
          onYes={handleRepairConfirm}
          onNo={handleRepairCancel}
          onClose={() => setIsUpdateStatusAlertOpen(false)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default WatchDetail;
