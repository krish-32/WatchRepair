import React, { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import InputRequired from "./HandleFormInput/InputRequired";
import CategorySelect from "./HandleFormInput/CategorySelect";
import Checkbox from "./HandleFormInput/checkbox";
import ImageUpload from "./HandleFormInput/UploadImage";
import toast from "react-hot-toast";
import Loader from "./Loading/Loading";
import axios from "axios";

const categories = [
  { label: "Titan", value: "titan" },
  { label: "Fastrack", value: "fastrack" },
  { label: "Sonata", value: "sonata" },
  { label: "Zoop", value: "zoop" },
  { label: "Xylys", value: "xylys" },
  { label: "Maxima", value: "maxima" },
  { label: "HMT", value: "hmt" },
  { label: "Boat", value: "boat" },
  { label: "Noise", value: "noise" },
  { label: "Fire-Boltt", value: "fire-boltt" },
  { label: "Pebble", value: "pebble" },
  { label: "Helix (by Timex)", value: "helix-by-timex" },
  { label: "Casio", value: "casio" },
  { label: "Timex", value: "timex" },
  { label: "Citizen", value: "citizen" },
  { label: "Seiko", value: "seiko" },
  { label: "Fossil", value: "fossil" },
  { label: "Daniel Wellington", value: "daniel-wellington" },
  { label: "Armani Exchange", value: "armani-exchange" },
  { label: "Emporio Armani", value: "emporio-armani" },
  { label: "Tommy Hilfiger", value: "tommy-hilfiger" },
  { label: "Guess", value: "guess" },
  { label: "Michael Kors", value: "michael-kors" },
  { label: "Invicta", value: "invicta" },
  { label: "Skagen", value: "skagen" },
  { label: "Tissot", value: "tissot" },
  { label: "Swatch", value: "swatch" },
  { label: "Lacoste", value: "lacoste" },
  { label: "Nixon", value: "nixon" },
  { label: "Diesel", value: "diesel" },
  { label: "MVMT", value: "mvmt" },
  { label: "Garmin (Smartwatches)", value: "garmin" },
  { label: "Amazfit", value: "amazfit" },
  { label: "Suunto", value: "suunto" },
  { label: "Fitbit (Smart-focused)", value: "fitbit" },
  { label: "Others", value: "Others" },
];

const issueTypes = [
  "Service",
  "Battery",
  "Glass",
  "Crown",
  "Case",
  "Dial",
  "Battery",
  "Coil",
  "P.C.B",
];

const balanceToPay = (amount, advancePaid) => {
  const amountValue = parseFloat(amount);
  const advancePaidValue = parseFloat(advancePaid);
  if (isNaN(amountValue) || isNaN(advancePaidValue)) {
    return "";
  }
  return (amountValue - advancePaidValue).toFixed(2);
};

const AddItemForm = ({ APIUrl }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState([]);
  const [addInputForWatchName, setAddInputForWatchName] = useState(false);

  const navigate = useNavigate();

  const handleImagesChange = (urls) => {
    setImages(urls);
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isLoading, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      model_no: "",
      phone_no: "",
      watch_name: "",
      nature_of_repair: "",
      issue_description: "",
      amount: "",
      advance_paid: "",
      balance_to_pay: "",
      delivery_date: "",
      date: "",
    },
  });

  const watch_name = watch("watch_name");

  useEffect(() => {
    const updateBalance = async () => {
      const amount = watch("amount");
      const advance_paid = watch("advance_paid");
      if (amount && advance_paid) {
        setValue("balance_to_pay", balanceToPay(amount, advance_paid));
      }
    };

    updateBalance();
  }, [watch("advance_paid"), watch("amount"), setValue]);

  useEffect(() => {
    if (watch_name?.value === "Others") {
      setValue("watch_name", "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setAddInputForWatchName(true);
    } else if (
      categories.some((category) => category.value === watch_name?.value)
    ) {
      setAddInputForWatchName(false);
    }
  }, [watch_name]);

  // const onBack = () => {
  //   navigate(-1);
  // };

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    setValue("image", images);
  }, [images]);

  const onSubmit = async (data) => {
    const nature_of_repair = [];

    for (let i = 0; i < issueTypes.length; i++) {
      if (data.nature_of_repair[i]) {
        nature_of_repair.push(issueTypes[i]);
      }
    }
    data.nature_of_repair = nature_of_repair;
    data.image = images;

    const payload = {
      ...data,
      watch_name: watch_name?.value || "",
      delivery_date: data.delivery_date || null,
    };

    try {
      setIsSaving(true);
      await axios.post(`${APIUrl}/add-watch`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSaving(false);

      toast.success("Watch added successfully!");

      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      {isSaving && <Loader />}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-lg">
          {/* <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-4 text-red-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button> */}
          <h1 className="text-3xl font-bold mb-2">New Repairs</h1>
          <p className="text-red-200">Submit repair request</p>
        </div>

        <div className="flex-grow w-full flex items-center justify-center mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <div className="space-y-6">
              {/* Grouped Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <InputRequired
                    label="Enter the name"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Address"
                    {...register("address")}
                    disabled={isLoading}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <InputRequired
                    label="Phone Number"
                    id="phone_no"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image (Optional)
                </label>
                <ImageUpload
                  APIUrl={APIUrl}
                  onChange={handleImagesChange}
                  images={images}
                  uploadPreset="yuvaTimes"
                />
              </div>

              {/* Watch Brand Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watch Brand Name *
                </label>
                <CategorySelect
                  categories={categories}
                  value={addInputForWatchName ? "Others" : watch_name?.value}
                  onChange={(value) => setCustomValue("watch_name", value)}
                  label="Watch Name"
                />
              </div>

              {addInputForWatchName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watch Name (If not listed)
                  </label>
                  <input
                    placeholder="Watch Brand Name"
                    id="watch_name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    onChange={(e) =>
                      setCustomValue("watch_name", { value: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              {/* Model Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Number *
                </label>
                <InputRequired
                  label="Model Number"
                  id="model_no"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* Issue Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Types *
                </label>
                <div className="flex flex-wrap gap-4">
                  {issueTypes.map((option, index) => (
                    <Checkbox
                      key={index}
                      name={`nature_of_repair[${index}]`}
                      control={control}
                      label={option}
                      value={option}
                    />
                  ))}
                </div>
              </div>

              {/* Issue Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Description (Optional if not listed)
                </label>
                <textarea
                  onChange={(e) =>
                    setCustomValue("issue_description", e.target.value)
                  }
                  placeholder="Enter issue description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                ></textarea>
              </div>

              {/* Amount and Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <InputRequired
                    label="Amount"
                    id="amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date (Optional)
                  </label>
                  <input
                    id="delivery_date"
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    {...register("delivery_date")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Advance Paid & Balance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Paid *(Mark it as 0 if not paid)
                  </label>
                  <InputRequired
                    label="Advance Paid"
                    id="advance_paid"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balance To Pay *(Calculated automatically)
                  </label>
                  <InputRequired
                    label="Balance To Pay"
                    id="balance_to_pay"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 transform hover:scale-105"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Watch</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemForm;
