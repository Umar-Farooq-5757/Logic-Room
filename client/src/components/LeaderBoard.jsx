import React from "react";
import { useAppContext } from "../contexts/AppContext";

const LeaderBoard = () => {
  const { isDark } = useAppContext();
  const leaderboardData = [
    {
      rank: 1,
      username: "Umar Farooq",
      problemsSolved: 4,
      rating: 2882,
    },
    {
      rank: 2,
      username: "Uzair Shabbir",
      problemsSolved: 4,
      rating: 2881,
    },
    {
      rank: 3,
      username: "Muhammad Rumman",
      problemsSolved: 4,
      rating: 2200,
    },
    {
      rank: 4,
      username: "Muhammad Arslan",
      problemsSolved: 4,
      rating: 2000,
    },
    {
      rank: 5,
      username: "Hasnain Ali",
      problemsSolved: 4,
      rating: 1798,
    },
    {
      rank: 6,
      username: "Muhammad Tayyab",
      problemsSolved: 4,
      rating: 1557,
    },
  ];
  return (
    <div
      className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} rounded-xl shadow-sm h-4/10 px-6 py-3`}
    >
      <h2
        className={`font-bold text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        Leaderboard
      </h2>
      <div
        className={`h-0.5 w-full ${isDark ? "bg-[#3b3440]" : "bg-gray-200"} my-3`}
      ></div>
      <div className=" overflow-y-auto max-h-50">
        <div className="flex justify-start items-center gap-17 px-5 pr-16 font-bold">
          <div>Rank</div>
          <div className="grow">Username</div>
          <div>Solved</div>
          <div>Rating</div>
        </div>
        {leaderboardData.map((data) => {
          return (
            <div
              className={`flex justify-start items-center gap-18 px-5 pr-16 pb-1 my-2 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
            >
              <div
                className={`${data.rank == 1 && "bg-[#f7c631] text-white"} ${data.rank == 2 && "bg-[#bebdb9] text-white"} ${data.rank == 3 && "bg-[#99580e] text-white"} py-1 px-3 font-bold rounded-xs`}
              >
                {/* {data.rank != 1 && data.rank != 2 && data.rank != 3 && "#"} */}
                {data.rank}
              </div>
              <div className="grow">{data.username}</div>
              <div className="mr-6">{data.problemsSolved}</div>
              <div>{data.rating}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;
