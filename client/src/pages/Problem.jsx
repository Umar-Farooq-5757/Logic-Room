import React, { useState } from "react";
import Editor from "../components/Editor";
import ProblemDetails from "../components/ProblemDetails";
import Dropdown from "../components/ui/Dropdown";
import languages from "../utils/languagesData";
import { FaCode } from "react-icons/fa";
// Expected problem schema
// id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
const Problem = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  return (
    <div className="flex gap-3 px-3 mt-5">
      <ProblemDetails />
      {/* Editor */}
      <section className="w-1/2 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <FaCode className="text-green-600 size-6" /> <h3 className="text-lg font-semibold">Code</h3>
          </div>
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
  );
};

export default Problem;
