import "./code-editor.css";
import Editor, {  OnMount} from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (getvalue, monacoEditor) => {
    // editorRef.current = monacoEditor;
    // monacoEditor.onDidChangeModelContent(() => {
    //   onChange(getvalue());
    // });
    // monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    editorRef.current = monacoEditor;
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModal().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        format
      </button>
      <Editor
        // editorDidMount={onEditorDidMount}
        onMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      {/* <Editor height="90vh" language="javascript" value="// some comment" />; */}
    </div>
  );
};

export default CodeEditor;
