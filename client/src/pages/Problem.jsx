import React, { useState } from "react";
import dummyProblemsData from "../utils/problemsData";
import { useAppContext } from "../contexts/AppContext";
import Math from "../utils/Math";
import { IoMdTime } from "react-icons/io";
import { MdOutlineMemory } from "react-icons/md";
import Editor from "../components/Editor";
const Problem = () => {
  // Expected problem schema
  // id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
  // console.log(dummyProblemsData[2]);
  const { isDark } = useAppContext();
  let idx = 2;
  const [code, setCode] = useState('// write code here\nconsole.log("Hello World");');
  return (
    <div className="flex gap-3 px-3 mt-5">
      {/* Problem Statement */}
      <section
        style={{ whiteSpace: "pre-line" }}
        className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} flex flex-col gap-2 rounded-xl shadow-sm h-6/10 w-1/2 px-5 py-4`}
      >
        <h2 className="font-bold text-lg">{dummyProblemsData[idx].title} :</h2>
        <p>{dummyProblemsData[2].statement}</p>
        {/* Input format */}
        <div>
          <h3
            className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}
          >
            Input Format:{" "}
          </h3>
          <p
            className={`${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2`}
          >
            {dummyProblemsData[idx].input_format}
          </p>
        </div>
        {/* Output format */}
        <div>
          <h3
            className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}
          >
            Output Format:{" "}
          </h3>
          <p
            className={`${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2`}
          >
            {dummyProblemsData[idx].output_format}
          </p>
        </div>
        {/* Constraints */}
        <div>
          <h3
            className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}
          >
            Constraints:{" "}
          </h3>
          <p
            className={`${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 text-center`}
          >
            <Math formula={dummyProblemsData[idx].constraints} />
          </p>
        </div>
        {/* Time and memory limit */}
        <div className="flex justify-around items-center my-4">
          <div
            className={`flex justify-center items-center gap-1 ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border shadow-xs rounded-md px-4 py-1.5`}
          >
            <IoMdTime className="size-6" />
            <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"}`}>
              Time Limit (ms):{" "}
            </h3>
            <p className="font-bold">{dummyProblemsData[idx].time_limit_ms}</p>
          </div>
          <div
            className={`flex justify-center items-center gap-1 ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border shadow-xs rounded-md px-4 py-1.5`}
          >
            <MdOutlineMemory className="size-6" />
            <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"}`}>
              Memory Limit (kb):{" "}
            </h3>
            <p className="font-bold">
              {dummyProblemsData[idx].memory_limit_kb}
            </p>
          </div>
        </div>
        {/* Sample Input & Output */}
        <div>
          <h3
            className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"} font-bold mb-1`}
          >
            Sample Input & Output:
          </h3>
          <p
            className={` ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 my-3`}
          >
            {dummyProblemsData[idx].samples?.[0].input}
          </p>
          <p
            className={` ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 my-3`}
          >
            {dummyProblemsData[idx].samples?.[0].output}
          </p>
          <p
            className={` ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 my-3`}
          >
            {dummyProblemsData[idx].samples?.[0].explanation}
          </p>
        </div>
      </section>
      {/* Editor */}
      <section className="border border-orange-400 w-1/2">
      <Editor code={code}/>
      </section>
    </div>
  );
};

export default Problem;
