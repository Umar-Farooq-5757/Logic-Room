import React from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isDark, setIsDark } = useAppContext();
  console.log(isDark);
  return (
    <header
      className={`flex justify-between items-center shadow-sm ${isDark && "shadow-[#3b3440]"} py-3 px-32`}
    >
      <h1 className="font-bold text-2xl">Logic Room</h1>
      <div className="buttons flex justify-center items-center gap-7">
        <button
          className="hover:opacity-100 opacity-70 p-1.5 rounded-full transition-all"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDark", !isDark);
          }}
        >
          {isDark ? (
            <LuSun className="size-5.5" />
          ) : (
            <LuMoon className="size-5.5" />
          )}
        </button>
        <button className="hover:opacity-100 opacity-70 p-1.5 rounded-full transition-all">
          <a
            className="cursor-default"
            href="https://github.com/Umar-Farooq-5757/Logic-Room"
            target="_blank"
          >
            <FaGithub className="size-5.5" />
          </a>
        </button>
        <button className="hover:opacity-100 opacity-70 p-1.5 rounded-full transition-all">
          <MdLogin className="size-5.5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
