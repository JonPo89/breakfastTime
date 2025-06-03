"use client"

import "./sass/global.scss";
import SplashPage from "./components/SplashPage";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Providers } from "./provider";
import AppShell from "./AppShell";
import { ToastProvider } from "./components/ToastProvider";
import { useSplash } from "./context/splashContext";



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const splash = useSplash();
  const [splashPage, setSplashPage] = useState(true);
  
  useEffect(() => {
    if (pathname !== '/'){
      setSplashPage(false);
    }
    if (splash){
      setSplashPage(false);
    }
  },[])

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      </head>
      
      <body>
        {splashPage? <SplashPage onFinish={() => setSplashPage(false)}/> : ''}
        <ToastProvider>
        <Providers>
          <AppShell splashPage={splashPage}>{children}</AppShell>
        </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
