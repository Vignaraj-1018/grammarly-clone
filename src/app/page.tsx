"use client"
import { useState } from "react";

export default function Home() {

  const [myText, setMyTest] = useState('');
  const [aiText, setAiTest] = useState('');

  const handleFix = () => {
    setAiTest(myText);
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h1 className="flex text-3xl font-bold">My Grammarly Clone</h1>
      <div className="flex flex-row gap-10 items-center">
        <div className="flex flex-col">
          <p className="flex font-bold text-4xl">Your Text</p>
          <textarea className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 min-w-80" placeholder="Write your text here..." onChange={(e)=>(setMyTest(e.target.value))}></textarea>
        </div>
        <button className="flex bg-blue-600 text-white font-bold h-10 w-20 justify-center items-center rounded-xl" onClick={handleFix}>FIX</button>
        <div className="flex flex-col">
          <p className="flex font-bold text-4xl">Fixed Text</p>
          <div className="flex border-[1px] border-slate-600 p-1 rounded-lg min-h-40 min-w-80">
            {aiText ? aiText: <p className="flex text-slate-400">Write something to get it fixed!</p> }
          </div>
        </div>
      </div>
    </div>
  );
}
