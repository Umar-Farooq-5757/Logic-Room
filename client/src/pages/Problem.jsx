import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import ProblemDetails from "../components/ProblemDetails";
import Dropdown from "../components/ui/Dropdown";
import languages from "../utils/languagesData";
import { FaCode, FaPlay } from "react-icons/fa";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
import SubmissionResult from "../components/SubmissionResult";
import api from "../api/axios";
import { useParams } from "react-router-dom";
// Expected problem sch../components/SubmissionResult
// id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
const Problem = () => {
  const { isDark } = useAppContext();
  const { slug } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [problem, setProblem] = useState({});
  const [testCases, setTestCases] = useState([]);
    const [code, setCode] = useState(``);

  // Fetching problem data and related test cases
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/getproblem/${slug}`);
        setProblem(response.data.problem);
        setTestCases(response.data.testCases)
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProblem();
  }, []);
  // Submitting Code
  const submitCode = async()=>{
    try {
      const res = await api.post('/submit',{language_id:54,source_code:code,stdin:"UmarFarooq"})
      const token = await res.data.token;
      const result = await api.get(`/poll/${token}`);
      console.log(result.data)
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <>
      <Header />
      <div className="flex gap-3 px-3 mt-5 min-h-190">
        <div className="flex flex-col gap-3 w-1/2">
          <ProblemDetails problem={problem}/>
          <SubmissionResult testCases={testCases}  />
        </div>
        {/* Editor */}
        <section className="w-1/2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaCode className="text-green-600 size-6" />{" "}
              <h3 className="text-lg font-semibold">Code</h3>
            </div>
            <button
            onClick={submitCode}
              className={`${isDark ? "bg-white text-black" : "bg-black text-white"} text-sm hover:opacity-75 flex items-center justify-center gap-2 py-1.5 px-4 rounded-md`}
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
            language="cpp"
            code={code}
            setCode={setCode}
            showLineNumbers={true}
          />
        </section>
      </div>
    </>
  );
};

export default Problem;
