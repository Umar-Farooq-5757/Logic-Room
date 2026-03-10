import React, { useEffect, useState } from "react";
import dummyProblemsData from "../utils/problemsData";
import Math from "../utils/Math";
import { IoMdTime } from "react-icons/io";
import { MdOutlineMemory } from "react-icons/md";
import { useAppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import ProblemDetailSkeleton from "./ui/ProblemDetailSkeleton";

const ProblemDetails = () => {
  const { isDark, problems } = useAppContext();
  const params = useParams()
  const slug = params.slug
  let idx = 2;
  const [problem, setProblem] = useState({})
  useEffect(() => {
    const findProblem = problems.find(prob => prob.slug === slug);
    if (findProblem) {
      setProblem(findProblem);
    }
  }, [slug, problems])
  if (!problem || Object.keys(problem).length === 0) return <ProblemDetailSkeleton/>
  return (
    <section
      style={{ whiteSpace: "pre-line" }}
      className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} flex flex-col gap-2 rounded-xl shadow-sm h-6/10 w-1/2 px-5 py-4`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{problem.title} :</h2>
        <div className={`${problem.difficulty == 'easy' && 'bg-green-300 border-green-600'} ${problem.difficulty == 'medium' && 'bg-orange-200 border-orange-500'} ${problem.difficulty == 'hard' && 'bg-red-300 border-red-600'} border rounded-xl px-2 text-sm font-semibold text-black`}>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</div>
      </div>
      <p>{problem.statement}</p>
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
          <Math formula={problem.constraints} />
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
          <p>{problem.timeLimitMs}</p>
        </div>
        <div
          className={`flex justify-center items-center gap-1 ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border shadow-xs rounded-md px-4 py-1.5`}
        >
          <MdOutlineMemory className="size-6" />
          <h3 className={`${isDark ? "text-[#b39adb]" : "text-[#6b1eb9]"}`}>
            Memory Limit (kb):{" "}
          </h3>
          <p>{problem.memoryLimitKb}</p>
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
          {problem.example_input}
        </p>
        <p
          className={` ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 my-3`}
        >
          {problem.example_output}
        </p>
        <p
          className={` ${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 border-gray-200"} border rounded-md shadow-xs px-4 py-2 my-3`}
        >
          {problem.explaination}
        </p>
      </div>
    </section>
  );
};

export default ProblemDetails;
