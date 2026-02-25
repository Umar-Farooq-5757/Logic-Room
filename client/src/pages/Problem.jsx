import React from "react";
import dummyProblemsData from "../utils/problemsData";
import { useAppContext } from "../contexts/AppContext";
import Math from "../utils/Math";
const Problem = () => {
  // Expected problem schema
  // id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
  console.log(dummyProblemsData[2]);
  const {isDark}=useAppContext()
  return (
    <div className="flex gap-3 px-3 mt-5">
      {/* Problem Statement */}
      <section className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} flex flex-col gap-2 rounded-xl shadow-sm h-6/10 w-1/2 px-5 py-4`}>
        <h2 className="font-bold text-lg">{dummyProblemsData[2].title} :</h2>
        <p>{dummyProblemsData[2].statement}</p>
        {/* Input format */}
        <div>
          <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}>Input Format: </h3>
          <p className="bg-gray-200 rounded-md shadow-xs px-4 py-2">{dummyProblemsData[2].input_format}</p>
        </div>
        {/* Output format */}
        <div>
          <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}>Output Format: </h3>
          <p className="bg-gray-200 rounded-md shadow-xs px-4 py-2">{dummyProblemsData[2].output_format}</p>
        </div>
        {/* Constraints */}
        <div>
          <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}>Constraints: </h3>
          <p className="bg-gray-200 rounded-md shadow-xs px-4 py-2 text-center"><Math formula={dummyProblemsData[2].constraints}/></p>
        </div>
      </section>
      {/* Editor */}
      <section className="border border-orange-400 w-1/2">editor here</section>
    </div>
  );
};

export default Problem;
