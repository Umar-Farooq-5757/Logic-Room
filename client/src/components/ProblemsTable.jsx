import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const ProblemsTable = () => {
  const { isDark } = useAppContext();
  const navigate = useNavigate()
  const problemsData = [
    {
      id: 1,
      title: "Sum of two",
      slug: "/sum-of-two",
      difficulty: "med.",
    },
    {
      id: 2,
      title: "Sum of two",
      slug: "/sum-of-two",
      difficulty: "easy",
    },
    {
      id: 3,
      title: "Sum of two",
      slug: "/sum-of-two",
      difficulty: "hard",
    },
  ];
  return (
    <div
      className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} rounded-xl shadow-xs h-6/10 px-6 py-3`}
    >
      <h2
        className={`font-bold text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        Problems
      </h2>
      <div
        className={`h-0.5 w-full ${isDark ? "bg-[#3b3440]" : "bg-gray-200"} my-3`}
      ></div>
      <div className=" overflow-y-auto max-h-84">
        {problemsData.map((problem) => {
          return (
            <div
            onClick={()=>navigate('/problem')}
              className={`flex justify-start cursor-pointer items-center ${isDark?'hover:bg-[#3b3440]':'hover:bg-gray-100'} gap-18 px-5 pr-16 py-2.5 rounded-md border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
            >
              <div>{problem.id}</div>
              <div className="grow">{problem.title}</div>
              <div className={`${problem.difficulty=='easy' && 'text-[#1cbaba]'} ${problem.difficulty=='med.' && 'text-[#ffb700]'} ${problem.difficulty=='hard' && 'text-red-500'}`}>
                {problem.difficulty.charAt(0).toUpperCase() +
                  problem.difficulty.slice(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemsTable;
