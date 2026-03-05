import React, { useState } from "react";
import Editor from "../components/Editor";
import ProblemDetails from "../components/ProblemDetails";
import Dropdown from "../components/ui/Dropdown";
import languages from "../utils/languagesData";
import { FaCode, FaPlay } from "react-icons/fa";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
// Expected problem schema
// id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
const Problem = () => {
  const { isDark } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  return (
    <>
      <Header />
      <div className="flex gap-3 px-3 mt-5">
        <ProblemDetails />
        {/* Editor */}
        <section className="w-1/2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaCode className="text-green-600 size-6" />{" "}
              <h3 className="text-lg font-semibold">Code</h3>
            </div>
            <button
              className={`${isDark ? "bg-white text-black" : "bg-black text-white"} text-sm hover:opacity-85 flex items-center justify-center gap-2 py-1.5 px-4 rounded-md`}
            >
              <FaPlay className="size-3" />
              <span>Submit</span>
            </button>
            <Dropdown
              languages={languages}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
          <Editor
            language="javascript"
            value={"function hello(){\n  console.log('hi')\n}\n"}
            fontSize={16}
            fontFamily={"'Fira Code', monospace"}
            showLineNumbers={true}
          />
        </section>
      </div>
    </>
  );
};

export default Problem;
