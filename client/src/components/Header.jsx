import React, { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { FaGithub, FaUser } from "react-icons/fa";
import { MdEmail, MdLogin, MdLogout } from "react-icons/md";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isDark, setIsDark } = useAppContext();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <header
      className={`flex justify-between items-center shadow-sm ${isDark && "shadow-[#3b3440]"} py-3 px-32`}
    >
      <h1 onClick={()=>navigate('/')} className="font-bold text-2xl cursor-pointer">Logic Room</h1>
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
        <button
          onClick={() => navigate("/login")}
          className="hover:opacity-100 opacity-70 p-1.5 rounded-full transition-all"
        >
          <MdLogin className="size-5.5" />
        </button>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={`p-1.5 relative text-sm rounded-full transition-all text-white font-bold ${isDark ? "bg-[#b39adb]" : "bg-[#6b1eb9]"}`}
        >
          UF
          {/* Profile Menu */}
          <div className={`${!isProfileMenuOpen && "hidden"} fixed inset-0`}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute font-medium px-3 py-6 flex flex-col gap-0.5 items-start w-60 h-40 transition-all right-34 top-12 border-2   ${isDark ? "border-[#3b3440] bg-[#16171d]" : "border-gray-300 text-black bg-white"} shadow-xl rounded-xl `}
            >
              <div
                className={`flex items-center gap-2 ${isDark ? "hover:bg-[#3b3440]" : "hover:bg-gray-100"} w-full rounded-md py-1.5 px-2`}
              >
                <FaUser className="size-5" />
                <p>Umar Farooq</p>
              </div>
              <div
                className={`flex items-center gap-2 ${isDark ? "hover:bg-[#3b3440]" : "hover:bg-gray-100"} w-full rounded-md py-1.5 px-2`}
              >
                <MdEmail className="size-5" />
                <p>aamirgel17@gmail.com</p>
              </div>
              <div
                className={`flex items-center gap-2 ${isDark ? "hover:bg-[#3b3440]" : "hover:bg-gray-100"} w-full rounded-md py-1.5 px-2`}
              >
                <MdLogout className="size-5" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
