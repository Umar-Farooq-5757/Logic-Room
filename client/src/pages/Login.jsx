import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const Login = () => {
  const { isDark } = useAppContext();
  const [method, setMethod] = useState("login");
  return (
    <div className="bg-[#ebf2ff] text-black h-screen flex justify-center items-center">
      {method == "login" && (
        <div className="h-1/2 w-3/8 border-2 rounded-lg shadow-sm border-gray-300 bg-white py-3 px-5 flex flex-col justify-center gap-7">
          <div>
            <h1 className="font-extrabold text-3xl text-center">
              Welcome Back!
            </h1>
            <p className="text-center text-sm">
              Please sign in to your account
            </p>
          </div>
         <div>
           <div className="input my-3">
            <p className="text-sm font-semibold">Email Address</p>
            <input
              className="border border-gray-300 rounded-sm w-full outline-none pl-3 py-2 my-1"
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="input my-3">
            <p className="text-sm font-semibold">Password</p>
            <input
              className="border border-gray-300 rounded-sm w-full outline-none pl-3 py-2 my-1"
              type="text"
              placeholder="Enter your password"
            />
          </div>
         </div>
          <button
            className={`${isDark ? "bg-[#6b1eb9]" : "bg-[#b39adb]"} text-white w-full rounded-md py-2 hover:opacity-85`}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
