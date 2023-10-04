import { useEffect, useRef } from "react";
import './preview.css';

interface PreviewProps {
  code: string;
  err:string;
}

const html = `
<html>
<head>
<style>
{background-color:white;}
</style>
</head>
<body>
<div id="root"></div>
<script>
const handleError =(err) =>{
  const root = document.querySelector('#root');
  root.innerHTML='<div style="color:red;">'+err+'</div>'
}

window.addEventListener('error',(event)=>{
  event.preventDefault();
  handleError(event.error)
})
 
window.addEventListener('message',(event)=>{
try{ eval(event.data)}catch(err){
  handleError(err)
}
},false)
</script>
</body>
</html>
`;
const Preview: React.FC<PreviewProps> = ({ code ,err}) => {
  const iframe = useRef<any>();

  // useEffect(() => {
  //   iframe.current.srcdoc = html;
  //   iframe.current.contentWindow.postMessage(code, "*");
  // }, [code]);

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  // console.log(err,'che hasti')
  
  return (
  <div className="preview-wrapper">  
    <iframe
      ref={iframe}
      title="preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
    {err&& <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
