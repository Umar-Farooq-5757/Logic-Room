import React from "react";
import { useAppContext } from "../contexts/AppContext";

const Problems = () => {
  const { isDark } = useAppContext();

  return (
    <div
      className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} rounded-xl shadow-sm h-6/10 px-6 py-3`}
    >
      <h2
        className={`font-bold text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        Problems
      </h2>
    </div>
  );
};

export default Problems;
