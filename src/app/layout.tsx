"use client"
import "./globals.css";
import axios from "axios";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sendViewAnalytics=()=>{
    const url = "https://api.vignaraj.in/my_website_analytics/website_view";
    const data ={
      "name":"Grammarly Clone",
      "url":"https://grammarly-clone.vignaraj.in/"
    }
    axios.post(url,data)
    .then((resp)=>{
      // console.log(resp);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

useEffect(()=>{
  const sessionData = window.sessionStorage.getItem("analyticsSent");
  if (sessionData === "true"){
    console.log("old Session");
  }
  else{
    sendViewAnalytics();
    console.log("new Session");
    window.sessionStorage.setItem("analyticsSent","true");
  }
},[]);
  return (
    <html lang="en" className="dark">
      
      <head>
        <title>Grammarly Clone</title>
        <link rel="icon" href="/favicon.svg"/>
      </head>

      <body className='dark:bg-primary dark:text-white text-primary'>
        {children}
        <footer className="flex items-center justify-center text-center p-2 bottom-0 fixed w-full font-bold text-xl border-t-2 bg-primary text-white">
          © {new Date().getFullYear()} Grammarly Clone. All rights reserved.
        </footer>
      </body>
    
    </html>
  );
}
