import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-1 w-full h-full border-4 border-t-transparent border-gray-500 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default Loader;
