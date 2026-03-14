import React, { useEffect, useState } from "react";
import ProblemDetails from "../components/ProblemDetails";
import Header from "../components/Header";
import SubmissionResult from "../components/SubmissionResult";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
// Expected problem sch../components/SubmissionResult
// id, title, slug, statement, timeLimitMs, memoryLimitKb, difficulty, tags
const Problem = () => {
  const { slug } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedLanguageID, setSelectedLanguageID] = useState(54);
  const [problem, setProblem] = useState({});
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("");

  // Fetching problem data and related test cases
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/getproblem/${slug}`);
        setProblem(response.data.problem);
        setTestCases(response.data.testCases);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProblem();
  }, []);
  return (
    <>
      <Header />
      <div className="flex gap-3 px-3 mt-5 min-h-190">
        <div className="flex flex-col gap-3 w-1/2">
          <ProblemDetails problem={problem} />
          <SubmissionResult testCases={testCases} />
        </div>
        {/* Editor */}
        <CodeEditor
        problem={problem}
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguageID={selectedLanguageID}
          setSelectedLanguageID={setSelectedLanguageID}
        />
      </div>
    </>
  );
};

export default Problem;
