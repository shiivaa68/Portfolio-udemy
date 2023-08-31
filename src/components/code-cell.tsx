import bundler from "../bundler";
import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";


const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setIput] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a=1;"
        onChange={(value) => setIput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => {
          setIput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
