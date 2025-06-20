export function Alert({
  isLoading,
  isOpen,
  message,
  onYes,
  onNo,
  onClose,
  image = null,
  title = "Confirmation Required",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-sm w-full shadow-xl text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <i className="fi fi-ss-cross-small text-xl"></i>
        </button>

        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {image && (
          <div className="mb-3 flex justify-center">
            <img
              src={image}
              alt={message}
              className="rounded object-contain"
              width={200}
              height={200}
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}

        <div className="mb-4 mt-2">
          <p className="text-lg font-medium">
            {!isLoading ? message : "Just a moment, updating..."}
          </p>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <button
            disabled={isLoading}
            onClick={() => {
              onYes();
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Yes
          </button>

          <button
            disabled={isLoading}
            onClick={() => {
              onNo();
              onClose();
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded disabled:opacity-50"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
