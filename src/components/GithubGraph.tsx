"use client";

import { GitHubCalendar } from "react-github-calendar";

const GithubGraph = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 mt-10">
      <h2 className="text-[30px] font-bold text-white mb-4">Days I Code</h2>
      <div className="w-full flex justify-center overflow-hidden">
        <div className="scale-90 sm:scale-100 transition-transform hover:scale-[1.02] duration-300">
          <GitHubCalendar
            username="minhaz23-oss"
            blockSize={12}
            blockMargin={5}
            fontSize={16}
            theme={{
              light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
            colorScheme="dark"
          />
        </div>
      </div>
      <p className="text-neutral-400 text-sm mt-2">
        My contribution graph from the last year
      </p>
    </div>
  );
};

export default GithubGraph;
