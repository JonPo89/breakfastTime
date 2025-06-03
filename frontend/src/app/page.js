"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import { useSplash } from "./context/splashContext";
import { gsap } from 'gsap';

export default function Home() {
  const splash = useSplash();
  const [logoLetters, setLogoLetters] = useState([]);
  const leftLocations = [0
    ,30.0443
    ,56.3739
    ,84.216
    ,114.4781
    ,140.7351
    ,169.5936
    ,197.4599
    ,221.4784
    ,254.5235
    ,280.4901
    ,301.1206
    ,333.6212
    ,368.8685];

  useEffect(() => {
    const letters = [];
    for (let i=0; i<14; i++){
      letters.push({id:i, left: (leftLocations[i]-(57*i)) + 'px', top:-400, scaleY: 2, scaleX: 0.5, address:`/images/logo/letters/LogoLetter-${i<9? `0${i+1}` : `${i+1}`}.png`})
    }
    setLogoLetters(letters);
  },[])
  
  useEffect(() => {
    if (logoLetters.length > 0 && !splash) {
      const masterTimeline = gsap.timeline();

      logoLetters.forEach((_, index) => {
        const target = `.logoLetter${index}`;

        const letterTimeline = gsap.timeline();
        letterTimeline
          .to(target, {
            top: 0,
            duration: 0.1,
          })
          .to(target, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.15,
          });

        masterTimeline.add(letterTimeline, `+=0`); // Add sequentially
      });

      return () => {
        masterTimeline.kill();
      };
    }
  }, [logoLetters, splash]);
  
  return (
    <div className="page">
      <div id="homePage">
        <div id="welcomeMessage">
          <p>Welcome to</p>
          <div id="homeLogo">
            <div id="logoTop">
              {logoLetters.slice(0,9).map((letter, index)=> (
                
                  <Image 
                    src={letter.address} 
                    key={letter.id} 
                    alt="Breakfast Time Logo" 
                    style={{left: letter.left, top: letter.top, transform: `scaleY(${letter.scaleY}) scaleX(${letter.scaleX})`}} 
                    width={710} 
                    height={710} 
                    className={`logoLetters logoLetter${index}`}
                  />
                
              ))}
            </div>
            <div id="logoBottom">
              {logoLetters.slice(9).map((letter, index)=>(
                
                  <Image 
                  src={letter.address} 
                  key={letter.id} 
                  alt="Breakfast Time Logo" 
                  style={{left: letter.left, top: letter.top, transform: `scaleY(${letter.scaleY}) scaleX(${letter.scaleX})`}} 
                  width={710} 
                  height={710} 
                  className={`logoLetters logoLetter${index+8}`}
                  />
                
              ))}
            </div>
          </div>

          <p>
          A card shop with funny, funky, and fashionable animals partnered along some hilarious, punny, and often <i>cringey</i> captions for all occasions!
          </p>
        </div>
        <Image src="/images/CharacterImages/chef.png" id="chef" width={1741} height={1557} alt="Breakfast Time Chef"/>
      </div>
      
    </div>
  );
}
