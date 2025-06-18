import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import InputRequired from "./HandleFormInput/InputRequired";
import CategorySelect from "./HandleFormInput/CategorySelect";
import Checkbox from "./HandleFormInput/checkbox";

const categories = [
  { label: "sk", value: "sk" },
  { label: "lp", value: "lp" },
];

const issueTypes = ["sk", "lp"];

const AddItemForm = ({ onBack, onSave }) => {
  const [preview, setPreview] = useState(null);
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
      amount: "",
      advance_paid: "",
      balance_to_pay: "",
      delivery_date: "",
      date: "",
    },
  });

  const watch_name = watch("watch_name");

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  // const [formData, setFormData] = useState({
  //   model: "",
  //   brand: "",
  //   price: "",
  //   image: "",
  //   status: "pending",
  //   description: "",
  //   year: new Date().getFullYear(),
  //   condition: "Good",
  //   serialNumber: "",
  //   movement: "Automatic",
  //   caseMaterial: "Stainless Steel",
  //   diameter: "",
  //   repairNotes: "",
  // });

  // const onSubmit = (data) => {
  //   e.preventDefault();
  //   const watch = {
  //     ...formData,
  //     price: parseFloat(formData.price),
  //     image:
  //       formData.image ||
  //       "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   };
  //   onSave(watch);
  // };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex flex-col">
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white px-4 sm:px-6 py-6 rounded-xl">
        {/* <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-4 text-red-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button> */}
        <h1 className="text-2xl sm:text-3xl font-bold">Add New Watch</h1>
        <p className="text-red-200">Enter watch details for inventory</p>
      </div>

      <div className="flex-grow w-full flex items-center justify-center px-4 sm:px-6 py-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Address *
              </label>
              <InputRequired
                label="Address"
                id="address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>

            {/* ... All other fields remain unchanged ... */}
            {/* Include Price, Year, Condition, Status, Serial Number, etc. */}

            {/* Repair Notes conditional */}
            {/* {formData.status === "repaired" && ( */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Number
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
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              disabled={isLoading}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition"
            >
              Choose File
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <InputRequired
              label="Listing Title"
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
              Watch Name
            </label>
            {/* change to select option */}

            <CategorySelect
              categories={categories}
              value={watch_name}
              onChange={(value) => setCustomValue("watch_name", value)}
              label="Watch Name"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Watch Name
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
              Amount
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input fields unchanged */}
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Paid
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
                balance To Pay *
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
  );
};

export default AddItemForm;
