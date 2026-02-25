import React from "react";
import { useAppContext } from "../contexts/AppContext";
import StatCard from "../components/ui/StatCard";
import { FaCheckCircle, FaFire } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AiOutlineBackward } from "react-icons/ai";
import LeaderBoard from "../components/LeaderBoard";
import Problems from "../components/Problems";

const Home = () => {
  const { isDark } = useAppContext();
  return (
    <div className="flex my-4 min-h-[90vh] px-6 py-4">
      {/* Problems container */}
      <div className="rounded-xl w-4/6 px-4 py-3 flex flex-col gap-6">
        <LeaderBoard />
        <Problems />
      </div>
      {/* Stats */}
      <div className="rounded-xl w-2/6 px-4 py-3 flex flex-col gap-4">
        <StatCard title={"Streak"} Icon={FaFire} iconColor={"#f54a00"} />
        <StatCard
          title={"Problems Solved"}
          Icon={FaCheckCircle}
          iconColor={"#00c950"}
        />
        <StatCard title={"Rank"} Icon={MdLeaderboard} iconColor={"#155dfc"} />
        <StatCard
          title={"Last Attempted"}
          Icon={AiOutlineBackward}
          iconColor={"#e7000b"}
        />
      </div>
    </div>
  );
};

export default Home;

// Daily Challenge Card: A prominent, high-contrast card featuring the "Problem of the Day." Include the difficulty level, potential points/XP, and a "Solve Now" button.

// User Pulse: A quick snapshot of their Current Streak (fire emoji style), total problems solved, and global rank.
// "Pick Up Where You Left Off": A direct link to the last problem or study plan they touched.

// Recommended for You: Use an algorithm to suggest problems based on their weak points (e.g., "You’ve been struggling with Dynamic Programming lately. Try these...").

// Skill Trees: Visual representations of topics like "Mastering Binary Trees" or "System Design Fundamentals."
// Live Leaderboard: A mini-widget showing the top performers of the week to spark a little healthy jealousy.
