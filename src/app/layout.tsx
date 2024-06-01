import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <head>
        <title>Grammarly Clone</title>
        <link rel="icon" href="/favicon.svg"/>
      </head>

      <body className='flex flex-col justify-between h-[100vh] w-[100vw]'>
        <div className="flex">
          {children}
        </div>
        <footer className="flex items-center justify-center text-center font-bold text-xl">
          &copy; {new Date().getFullYear()} Grammarly Clone. All rights reserved.
        </footer>
      </body>
    
    </html>
  );
}
