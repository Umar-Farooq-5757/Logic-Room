import api from "../api/axios";
import Dropdown from "../components/ui/Dropdown";
import languages from "../utils/languagesData";
import { FaCode, FaPlay } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import Editor from "../components/Editor";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";
const CodeEditor = ({
  problem,
  selectedLanguage,
  setSelectedLanguage,
  selectedLanguageID,
  setSelectedLanguageID,
  code,
  setCode,
}) => {
  const { isDark, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  // Appending submission in database
  const createSubmission = async (
    status,
    runtime,
    memory,
    stdout,
    stderr,
    compile_output,
    judge_token,
  ) => {
    try {
      const formattedCode = JSON.stringify(code).slice(1, -1);
      const res = await api.post("/create-submission", {
        language_id: selectedLanguageID,
        source_code: formattedCode,
        status,
        runtime,
        memory,
        stdout,
        stderr,
        compile_output,
        judge_token,
        user_id: user.id,
        problem_id: problem.id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  // Submitting Code
  const submitCode = async () => {
    setLoading(true);
    try {
      const res = await api.post("/submit", {
        language_id: selectedLanguageID,
        source_code: code,
        stdin: "UmarFarooq",
      });
      const token = await res.data.token;
      const response = await api.get(`/poll/${token}`);
      await createSubmission(
        response.data.result.status.description,
        response.data.result.time,
        response.data.result.memory,
        response.data.result.stdout,
        response.data.result.stderr,
        response.data.result.compile_output,
        response.data.result.token,
      );
      //   console.log(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
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
          {loading ? (
            <RiLoader4Fill className="size-4.5 font-extrabold animate-spin" />
          ) : (
            <FaPlay className="size-3" />
          )}
          <span>Submit</span>
        </button>
        <Dropdown
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedLanguageID={setSelectedLanguageID}
        />
      </div>
      <Editor
        language="cpp"
        code={code}
        setCode={setCode}
        showLineNumbers={true}
      />
    </section>
  );
};

export default CodeEditor;
