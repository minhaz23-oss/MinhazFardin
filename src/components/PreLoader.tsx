"use client";

import { useState, useEffect } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust the speed of the loading effect
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
      <div className="relative">
        {/* Black Text Base */}
        <span className=" text-[35px] sm:text-6xl font-bold text-white/20">Minhaz Fardin</span>

        {/* White Overlay */}
        <span
          className="absolute top-0 left-0 text-[35px] sm:text-6xl font-bold text-white h-full overflow-hidden"
          style={{
            width: `${progress}%`,
            whiteSpace: "nowrap", // Ensures "Minhaz Fardin" stays in one line
          }}
        >
          Minhaz Fardin
        </span>
      </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white font-bold text-[20px]">
          {progress}%
        </div>
    </div>
  );
};

export default Preloader;
