// src/components/CodeEditor.jsx
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { lineNumbers } from "@codemirror/view";

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
  theme = "dark",
  showLineNumbers = true,
  lineWrapping = false,
  fontSize = 14,
  height = "400px",
}) {
  const langExtension = language === "python" ? python() : javascript();

  const extensions = [
    langExtension,
    ...(showLineNumbers ? [lineNumbers()] : []),
    ...(theme === "dark" ? [oneDark] : []),
  ];

  const editorStyle = {
    fontSize: `${fontSize}px`,
  };

  return (
    <div style={{ height }}>
      <CodeMirror
        value={value}
        height="100%"
        style={editorStyle}
        extensions={extensions}
        onChange={(val, viewUpdate) => onChange && onChange(val)}
      />
    </div>
  );
}
