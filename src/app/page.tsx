"use client"
import axios from "axios";
import { useState } from "react";
export default function Home() {

  const [myText, setMyText] = useState('');
  const [aiText, setAiText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const aiPrompt  = [
    {
      "role":"user",
      "parts":[
        {
          "text": "for every prompt I am providing, you need to rewrite the grammar for me, and you should only send me the corrected version of my prompt only"
        }
      ]
      },
      {
        "role": "model",
        "parts":[
          {
          "text": "Sure!"}
        ]
      }
    ]

  const handleFix = () => {
    let data = [...aiPrompt,
      {
        "role": "user",
        "parts":[
          {
            "text": myText}
          ]
        }
      ]
      
    let postData = {contents: data};
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`
    console.log(data, postData);
    // setAiTest('');
    setLoading(true);
    setCopied(false);
    axios.post(url, postData)
    .then((resp:any)=>{
      console.log(resp);
      setMyText(resp.data.candidates[0].content.parts[0].text);
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

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="flex sm:text-5xl text-2xl font-bold">Grammarly</p>
        <p className="flex font-semibold p-5">Elevate your writing with real-time grammar and spelling corrections.</p>
      </div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2">
          <textarea value={myText} className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 sm:w-[50rem] w-[20rem]" placeholder="Write your text here..." onChange={(e)=>(setMyText(e.target.value))}>
          </textarea>
          {loading && <p className="flex justify-center items-center z-[1000] fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#ffffffa8] text-3xl font-bold">Loading...</p>}
          {aiText && <div className="flex justify-start gap-3">
            {!copied && <img src="/copy.svg" alt="Copy" className="flex cursor-pointer h-8 w-8" title="Copy To Clipboard" onClick={copyToClipboard}/>}
            {copied && <img src="/done.svg" alt="Copy" className="flex cursor-pointer h-8 w-8" title="Copy To Clipboard" onClick={copyToClipboard}/>}
            <img src="/reload.svg" alt="Reload" className="flex cursor-pointer h-8 w-8" title="Reload" onClick={handleFix}/>
          </div>}
        </div>
        <div className="flex flex-row gap-5">
          <button className={`flex ${!aiText ? 'bg-blue-600' : 'bg-blue-400 cursor-not-allowed'} text-white font-bold h-10 w-20 justify-center items-center rounded-xl`} disabled={aiText} onClick={handleFix}>FIX</button>
          <button className={`flex ${aiText ? 'bg-blue-600' : 'bg-blue-400 cursor-not-allowed'} text-white font-bold h-10 w-20 justify-center items-center rounded-xl`} disabled={!aiText} onClick={handleReset}>Reset</button>
        </div>
        {/* <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="flex font-bold text-4xl">Fixed Text</p>
          </div>
          <div className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 min-w-80 bg-white">
          {loading ? (
            ) : aiText ? (
              aiText
            ) : (
              <p className="flex text-slate-400">Write something to get it fixed!</p>
            )}
          </div>
        </div> */}
      </div>
      <div className="flex flex-col gap-5 items-center p-4">
        <h2 className="flex text-xl font-bold text-center justify-center">Instructions to Use Our Chrome Extension</h2>
        <ol>
            <li><strong>Download the Extension:</strong> Click the button below to download our extension.</li>
            <li><strong>Extract the Zip File:</strong> Unzip the downloaded file.</li>
            <li><strong>Install in Chrome:</strong> Follow the steps to install the extension in Chrome.</li>
            <li><strong>Enable the Extension:</strong> Make sure it is enabled in Chrome extensions settings.</li>
            <li><strong>Start Using:</strong> Visit a webpage and enjoy its features!</li>
        </ol>
        <a href="/chrome-extension.zip" download className="flex p-1 bg-blue-600 rounded-xl text-white font-bold hover:scale-110 w-60 justify-center items-center">Download Extension</a>
      </div>
    </div>
  );
}
