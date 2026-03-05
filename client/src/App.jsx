import { useState } from "react";
import "./App.css";
import { useAppContext } from "./contexts/AppContext";
import { Outlet } from "react-router-dom";

function App() {
  const { isDark } = useAppContext();
  return (
    <div
      className={`${isDark ? "bg-[#16171d] text-white" : "bg-white"} min-h-screen`}
    >
      <Outlet />
    </div>
  );
}

export default App;
