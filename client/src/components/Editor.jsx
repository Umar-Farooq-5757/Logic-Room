import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css"; // dark theme base
import { useAppContext } from "../contexts/AppContext";

export default function Editor({
  language = "javascript",
  fontSize = 14,
  showLineNumbers = true,
}) {
  const {isDark} = useAppContext()
  const [code, setCode] = useState(
    `function hello() {\nconsole.log("Hello World");
}`,
  );

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    highlightCode();
  }, [code, language]);

  const highlightCode = () => {
    const grammar = Prism.languages[language] || Prism.languages.javascript;
    const html = Prism.highlight(code, grammar, language);
    highlightRef.current.innerHTML = html + (code.endsWith("\n") ? "\n" : "");
  };

  const handleScroll = (e) => {
    highlightRef.current.scrollTop = e.target.scrollTop;
    highlightRef.current.scrollLeft = e.target.scrollLeft;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);

      setCode(newCode);

      requestAnimationFrame(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
          start + 2;
      });
    }
  };

  const lines = code.split("\n").length;

  return (
    <div
      className={`flex border editor ${isDark ? "border-[#3b3440]" : "border-gray-300"} ${isDark?'bg-transparent text-gray-100':'bg-gray-100 text-gray-700'}  rounded-xl h-full w-full overflow-hidden`}
    >
      {/* Line Numbers */}
      {showLineNumbers && (
        <div className={`${isDark?'bg-[#24252b] text-gray-200':'bg-gray-200 text-gray-700'} text-xs px-3 py-3 select-none text-right`}>
          {Array.from({ length: lines }, (_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>
      )}

      {/* Editor Area */}
      <div className="relative flex-1">
        {/* Highlighted Code */}
        <pre
          ref={highlightRef}
          className="absolute inset-0 m-0 p-3 overflow-auto pointer-events-none leading-6 whitespace-pre font-mono"
          style={{ fontSize, fontFamily: "monospace" }}
        />

        {/* Transparent Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={true}
          className={`absolute inset-0 resize-none outline-none bg-transparent text-transparent ${isDark ? 'caret-white':'caret-black'} caret p-3 leading-6 whitespace-pre font-mono overflow-auto`}
          style={{ fontSize, fontFamily: "monospace" }}
        />
      </div>
    </div>
  );
}
