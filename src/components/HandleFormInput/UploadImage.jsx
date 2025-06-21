import React, { useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import axios from "axios";
import { Upload } from "lucide-react";

const ImageUpload = ({ APIUrl, images = [], onChange, uploadPreset }) => {
  const cloudName = "dnxsvsdaq";

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openUploadWidget = () => {
    if (!window.cloudinary || !uploadPreset) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "url", "camera"],
        multiple: true,
        maxFiles: 1,
        cropping: false,
        defaultSource: "local",
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          onChange((prev) => [...prev, uploadedUrl]);
        }
      }
    );

    widget.open();
  };

  const handleDelete = async (urlToDelete) => {
    const publicId = urlToDelete.split("/").slice(-1)[0].split(".")[0];

    try {
      const response = await axios.post(`${APIUrl}/delete-image`, {
        publicId: publicId,
      });

      const result = await response.data;
      if (result.success) {
        const updated = images.filter((url) => url !== urlToDelete);
        onChange(updated);
      } else {
        console.error("Failed to delete image:", result.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName } });

  return (
    <div className="form-group">
      {images.length <= 0 && (
        <button
          type="button"
          onClick={openUploadWidget}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </button>
      )}

      {images.length > 0 && (
        <div className="d-flex flex-wrap gap-3 justify-content-start">
          {images.map((url, idx) => {
            const publicId = url.split("/").slice(-1)[0].split(".")[0]; // crude public_id extraction
            const cldImage = cld
              .image(publicId)
              .format("auto")
              .quality("auto")
              .resize(auto().gravity(autoGravity()).width(500).height(500));

            return (
              <div key={idx} className="position-relative border rounded p-1">
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                  onClick={() => handleDelete(url)}
                >
                  &times;
                </button>
                <AdvancedImage cldImg={cldImage} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
