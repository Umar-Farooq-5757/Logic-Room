import React from "react";
import { useAppContext } from "../../contexts/AppContext";

const StatCard = ({ title, Icon, iconColor }) => {
  const { isDark } = useAppContext();
  return (
    <div
      className={`font-extrabold text-xl px-5 py-3 border ${isDark ? "border-[#3b3440]" : "border-gray-300"} rounded-xl shadow-sm h-1/4`}
    >
      <div style={{ color: iconColor }} className="flex items-center gap-2">
        <Icon className="size-6" />{" "}
        <h3 className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {title}
        </h3>{" "}
      </div>
    </div>
  );
};

export default StatCard;
