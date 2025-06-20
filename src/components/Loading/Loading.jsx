const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500 mx-auto"></div>
        <p className="mt-2 text-white text-sm font-medium">Processing...</p>
      </div>
    </div>
  );
};

export default Loader;
