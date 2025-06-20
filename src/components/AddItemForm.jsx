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
  { label: "others", value: "others" },
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

const AddItemForm = () => {
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
    if (watch_name?.value === "others") {
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

    console.log(payload);

    try {
      setIsSaving(true);
      await axios.post("http://localhost:5000/add-watch", payload, {
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
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex flex-col">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white px-4 sm:px-6 py-6 rounded-xl mb-5">
          {/* <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-4 text-red-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button> */}
          <h1 className="text-2xl sm:text-3xl font-bold">Add Watch</h1>
          <p className="text-red-200">Submit repair request</p>
        </div>

        <div className="flex-grow w-full flex items-center justify-center px-4 sm:px-6 py-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Input fields unchanged */}
              {/* Brand */}
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

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Address"
                  {...register("address", { required: false })}
                  disabled={isLoading}
                />
              </div>

              {/* ... All other fields remain unchanged ... */}
              {/* Include Price, Year, Condition, Status, Serial Number, etc. */}

              {/* Repair Notes conditional */}
              {/* {formData.status === "repaired" && ( */}
              <div className="md:col-span-2">
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
              {/* )} */}
            </div>
            {/* Description and Image */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image (optional)
              </label>

              <ImageUpload
                onChange={handleImagesChange}
                images={images}
                uploadPreset="yuvaTimes"
              />
            </div>
            <div className="mt-6">
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
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Watch Brand Name *
              </label>
              {/* change to select option */}

              <CategorySelect
                categories={categories}
                value={addInputForWatchName ? "others" : watch_name?.value}
                onChange={(value) => setCustomValue("watch_name", value)}
                label="Watch Name"
              />
            </div>
            {addInputForWatchName && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watch Name (if not listed)
                </label>
                <input
                  label="watch_name"
                  id="watch_name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                  onChange={(e) =>
                    setCustomValue("watch_name", { value: e.target.value })
                  }
                  errors={errors}
                  required
                />
              </div>
            )}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Types *
              </label>
              {/* change to select option */}

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
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue description (optional if not listed)
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
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
                  Delivery Date (optional)
                </label>
                <input
                  id="delivery_date"
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="delivery_date"
                  {...register("delivery_date", { required: false })}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input fields unchanged */}
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Paid *(mark it as 0 if not paid)
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

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance To Pay *(calculated automatically)
                </label>
                <InputRequired
                  label="balance To Pay"
                  id="balance_to_pay"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* )} */}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                <span>Save Watch</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemForm;
