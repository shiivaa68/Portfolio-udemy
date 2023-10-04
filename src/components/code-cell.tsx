import {  useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
// import bundle from "../bundler";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import './code-cell.css'

interface CodeCellProps {
  cell:Cell;
}


const CodeCell:React.FC<CodeCellProps> = ({cell}) => {
  // const [code, setCode] = useState("");
  // const [input, setIput] = useState("")
  // const [err,setErr] =useState('');
const {updateCell,createBundle} =useActions();
 const bundle = useTypedSelector((state)=>state.bundles[cell.id])
 const cumulativeCode =useTypedSelector(state =>{
  const {data,order} = state.cells;
  const orderCells = order.map(id =>data[id])
 const cumulativeCode =[

   `
  const show = (value)=>{
    if(typeof value ==='object'){
      document.querySelector('#root').innerHTML =JSON.stringify(value)
    }else {
      document.querySelector('#root').innerHTML =value;
    }

  }  
  `
 ];
  for( let c of orderCells){
    if(c.type ==='code'){
      cumulativeCode.push(c.content)
    }if (c.id ===cell.id){
      break;
    }
    return cumulativeCode;
  }


 })
useEffect(() => {
  if(!bundle){
    createBundle(cell.id,cumulativeCode.join('\n'));
    return;
  }
  const timer = setTimeout(async () => {
 createBundle(cell.id,cumulativeCode.join('\n'))
  }, 750);

  return () => {
    clearTimeout(timer);
  };
  //eslint-disable-next-line react-hooks/exhaustive-deps
}, [cell.id,cumulativeCode?.join('\n'),createBundle]);
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     const output = await bundle(cell.content);
  //     setCode(output.code);
  //     setErr(output.err)
  //   }, 750);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% -10px)', display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) =>updateCell(cell.id,value) }
          />
        </Resizable>
        <div className="progress-wrapper">
        {!bundle || bundle.loading ?
         <div className="progress-cover">
         <progress className="progress is-small is-primary" max="100">
            loading
          </progress>
        
        </div>:<Preview code={bundle.code} err={bundle.err}/>
       
  }
   </div>
        {/* <textarea>
          value={input}
          onChange={(e) => {
            setIput(e.target.value);
          }}
        ></textarea>
        <div>
          <button onClick={onClick}>submit</button>
        </div> */}
       {/* {bundle &&  <Preview code={bundle.code} err={bundle.err}/>} */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
