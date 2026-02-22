// CodeEditor.jsx
import Editor, { useMonaco } from '@monaco-editor/react'
import { useRef } from 'react'

export default function CodeEditor({ language='cpp', value, onChange }) {
  const editorRef = useRef(null)
  const monaco = useMonaco()

  function handleMount(editor, monacoInstance) {
    editorRef.current = editor

    monacoInstance.editor.defineTheme('contest-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ token: 'comment', foreground: '6A9955' }],
      colors: { 'editor.background': '#0f1720' }
    })
    monacoInstance.editor.setTheme('contest-dark')

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      console.log('Run code:', editor.getValue())
    })
  }

  return (
    <Editor
      height="60vh"
      defaultLanguage={language}
      defaultValue={value}
      onMount={handleMount}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        lineNumbers:'on'
      }}
    />
  )
}