"use client"
import axios from "axios";
import { useState } from "react";
export default function Home() {

  const [myText, setMyText] = useState('');
  const [aiText, setAiText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleFix = () => {
    if (myText.length <= 0){
      return;
    }
      
    let postData = {text: myText};
    let url = `https://helper-api-vignu.el.r.appspot.com/grammarly/fix`
    // console.log(postData);
    setLoading(true);
    setCopied(false);
    axios.post(url, postData)
    .then((resp:any)=>{
      // console.log(resp);
      setMyText(resp.data.result);
      setAiText(true)
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
     

  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myText).then(()=>{
      setCopied(true);
    });
  }

  const handleReset = () =>{
    setMyText('');
    setAiText(false);
    setCopied(false);
  }

  const applyDarkTheme = () =>{
    document.documentElement.classList.add('dark');
    setDarkTheme(true);
  }

  const applyLightTheme = () =>{
    document.documentElement.classList.remove('dark');
    setDarkTheme(false);
  }

  return (
    <div className="flex flex-col gap-10 w-full overflow-auto">
      <div className="flex justify-between items-center w-full border-b-2">
        <div className="flex flex-start p-3 w-full items-center flex-row gap-5">
          <img src="favicon.svg" alt="GC Icon" className="flex h-12 w-12"/>
          <p className="flex sm:text-5xl text-2xl font-bold">Grammarly</p>
        </div>
        <div className="flex p-2 cursor-pointer">
          {!darkTheme && <img src="moon.svg" alt="dark" className="flex h-12 w-12" onClick={applyDarkTheme}/>}
          {darkTheme && <img src="sun.svg" alt="light" className="flex h-12 w-12" onClick={applyLightTheme}/>}
        </div>
      </div>
      <div className="flex flex-col gap-40 justify-center items-center h-full p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2 items-center">
            <textarea value={myText} className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 sm:w-[50rem] w-[20rem] text-black" placeholder="Write your text here..." onChange={(e)=>(setMyText(e.target.value))}>
            </textarea>
            {loading && <p className="flex justify-center items-center z-[1000] fixed top-0 left-0 w-[100vw] h-[100vh] dark:bg-[#ffffff38] bg-[#ffffff80] text-3xl font-bold">Loading...</p>}
            {aiText && <div className="flex justify-start gap-3">
              {!copied && <img src="/copy.svg" alt="Copy" className="flex cursor-pointer h-8 w-8" title="Copy To Clipboard" onClick={copyToClipboard}/>}
              {copied && <img src="/done.svg" alt="Copy" className="flex cursor-pointer h-8 w-8" title="Copy To Clipboard" onClick={copyToClipboard}/>}
              <img src="/reload.svg" alt="Reload" className="flex cursor-pointer h-8 w-8" title="Reload" onClick={handleFix}/>
            </div>}
          </div>
          <div className="flex flex-row gap-5">
            <button className={`flex bg-secondary text-white font-bold h-10 w-20 justify-center items-center rounded-xl`} onClick={handleFix}>FIX</button>
            <button className={`flex bg-secondary text-white font-bold h-10 w-20 justify-center items-center rounded-xl`} onClick={handleReset}>Reset</button>
          </div>
          <p className="flex font-semibold">Elevate your writing with real-time grammar and spelling corrections.</p>
        </div>
        <div className="flex flex-col gap-5 items-center p-4 border-2 rounded-xl">
          <h2 className="flex text-xl font-bold text-center justify-center underline underline-offset-4">Instructions to Use Our Chrome Extension</h2>
          <ol>
              <li><strong>Download the Extension:</strong> Click the button below to download our extension.</li>
              <li><strong>Extract the Zip File:</strong> Unzip the downloaded file.</li>
              <li><strong>Install in Chrome:</strong> Follow the steps to install the extension in Chrome.</li>
              <li><strong>Enable the Extension:</strong> Make sure it is enabled in Chrome extensions settings.</li>
              <li><strong>Start Using:</strong> Enjoy its features!</li>
          </ol>
          <a href="/chrome-extension.zip" download className="flex p-1 bg-secondary rounded-xl text-white font-bold hover:scale-110 w-60 justify-center items-center">Download Extension</a>
        </div>
      </div>
    </div>
  );
}
