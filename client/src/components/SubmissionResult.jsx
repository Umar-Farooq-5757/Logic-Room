import { useAppContext } from "../contexts/AppContext";
import {  useState } from "react";
import { FaCircleCheck ,FaCircleXmark} from "react-icons/fa6";

const SubmissionResult = ({ testCases }) => {
  const { isDark } = useAppContext();
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("test-results");
  return (
    <div
      className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} flex flex-col gap-2 rounded-xl shadow-sm h-6/10 w-full px-5 py-2.5`}
    >
      <h3 className="font-bold text-lg">Submission Results</h3>

      <div>
        {/* Tabs */}
        <div className="flex items-center gap-5">
          <div
            className={`${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 hover:bg-gray-200 border-gray-200"} text-sm shadow-xs cursor-default border rounded-md px-2.5 py-0.5`}
            onClick={() => setSelectedTab("compile-output")}
          >
            Compile Output
          </div>
          <div
            className={`${isDark ? "bg-transparent border-[#3b3440]" : "bg-gray-100 hover:bg-gray-200 border-gray-200"} text-sm shadow-xs cursor-default border rounded-md px-2.5 py-0.5`}
            onClick={() => setSelectedTab("test-results")}
          >
            Test Results
          </div>
        </div>
        {selectedTab == "compile-output" &&
          (!isCodeSubmitted ? (
            <div className="flex text-gray-400 text-sm h-48 justify-center items-center">
              Submit your code to see results
            </div>
          ) : (
            <div>compile output</div>
          ))}
        {selectedTab == "test-results" &&
          (!isCodeSubmitted ? (
            <div className="flex text-gray-400 text-sm h-48 justify-center items-center">
              Submit your code to see results
            </div>
          ) : (
            <div className="py-2">
              {testCases.map((testCase) => {
                return (
                  <div className="flex items-center gap-10 my-4">
                    <div className={`${isDark ? "border-[#3b3440]" : "border-gray-300"} border rounded-md shadow-sm py-1 px-10`}>{testCase.input}</div>
                    <div className="font-extrabold">{'==>'}</div>
                    <div className={`${isDark ? "border-[#3b3440]" : "border-gray-300"} border rounded-md shadow-sm py-1 px-10 relative`}>
                      <div><FaCircleCheck className="text-green-600 size-3.5 self-start absolute -top-1 -right-1"/></div>
                      {/* <div><FaCircleXmark className="text-red-500 size-3.5 self-start absolute -top-1 -right-1"/></div> */}
                      <div>{testCase.output}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubmissionResult;
