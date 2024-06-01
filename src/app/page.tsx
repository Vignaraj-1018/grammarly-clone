"use client"
import axios from "axios";
import { useState } from "react";
export default function Home() {

  const [myText, setMyTest] = useState('');
  const [aiText, setAiTest] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const aiPrompt  = [
    {
      "role":"user",
      "parts":[
        {
        "text": "From next prompt I will be just providing come text or sentence or paragraph, you need to rewrite the grammar for me"}
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
    setAiTest('');
    setLoading(true);
    setCopied(false);
    axios.post(url, postData)
    .then((resp:any)=>{
      console.log(resp);
      setAiTest(resp.data.candidates[0].content.parts[0].text);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
     

  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiText).then(()=>{
      setCopied(true);
    });
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h1 className="flex text-3xl font-bold">My Grammarly Clone</h1>
      <div className="flex sm:flex-row flex-col gap-10 items-center">
        <div className="flex flex-col">
          <p className="flex font-bold text-4xl">Your Text</p>
          <textarea className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 min-w-80" placeholder="Write your text here..." onChange={(e)=>(setMyTest(e.target.value))}></textarea>
        </div>
        <button className="flex bg-blue-600 text-white font-bold h-10 w-20 justify-center items-center rounded-xl" onClick={handleFix}>FIX</button>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="flex font-bold text-4xl">Fixed Text</p>
            {aiText && !copied && <img src="/copy.svg" alt="Copy" className="flex cursor-pointer" title="Copy To Clipboard" onClick={copyToClipboard}/>}
            {aiText && copied && <img src="/done.svg" alt="Copy" className="flex cursor-pointer" title="Copy To Clipboard" onClick={copyToClipboard}/>}
          </div>
          <div className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 min-w-80">
          {loading ? (
              <p className="flex justify-center items-center z-[1000] fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#ffffffa8] text-3xl font-bold">Loading...</p>
            ) : aiText ? (
              aiText
            ) : (
              <p className="flex text-slate-400">Write something to get it fixed!</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
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
