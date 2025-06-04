"use client"

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function SplashPage ({onFinish}) {
    const yolkRef = useRef(null);
  const eggWhiteTopRef = useRef(null);
  const eggWhite2Ref = useRef(null);
  const eggWhite3Ref = useRef(null);
  const eggWhite4Ref = useRef(null);
  const eggWhite5Ref = useRef(null);
  const yolkDrip1Ref = useRef(null);
  const yolkDrip2Ref = useRef(null);
  const yolkDrip3Ref = useRef(null);
  const yolkDrip4Ref = useRef(null);
  const spatulaRef = useRef(null);
  const [yolkDripLoc, setYolkDripLoc] = useState(false);
  const [yolkSize, setYolkSize] = useState(90);
  const [yolkTransitionSpeed, setYolkTransitionSpeed] = useState(0.5);
  const [transitionStyle, setTransitionStyle] = useState('');
  const [swipeTransition, setSwipeTransition] = useState(false);
  const [animationOver, setAnimationOver] = useState(false);
  const [centerEgg, setCenterEgg] = useState(false);
  
  const router = useRouter();

  useLayoutEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = (window.innerHeight / 2)-50;

    gsap.set(yolkRef.current, { x: centerX, y: centerY });
    gsap.set(eggWhiteTopRef.current, { x: centerX, y: centerY });
    gsap.set(eggWhite2Ref.current, { x: centerX - 10, y: centerY });
    gsap.set(eggWhite3Ref.current, { x: centerX + 20, y: centerY });
    gsap.set(eggWhite4Ref.current, { x: centerX, y: centerY });
    gsap.set(eggWhite5Ref.current, { x: centerX, y: centerY + 10 });
    gsap.set(yolkDrip1Ref.current, { x: centerX, y: centerY});
    gsap.set(yolkDrip2Ref.current, { x: centerX, y: centerY});
    gsap.set(yolkDrip3Ref.current, { x: centerX, y: centerY});
    gsap.set(yolkDrip4Ref.current, { x: centerX, y: centerY});
    gsap.set(spatulaRef.current, { x: centerX - 125, y: window.innerHeight + 200})
  },[])

  useEffect(() => {
    
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(yolkRef.current, {
        x: x ,
        y: y,
        duration: 0.03,
        ease: "power1.out"
      });

      gsap.to(yolkDrip1Ref.current, {
        x: x,
        y: y,
        duration: 0.1 ,
        ease: "power1.out"
      });
      gsap.to(yolkDrip2Ref.current, {
        x: x,
        y: y,
        duration: 0.08 ,
        ease: "power1.out"
      });
      gsap.to(yolkDrip3Ref.current, {
        x: x,
        y: y,
        duration: 0.05,
        ease: "power1.out"
      });

      gsap.to(yolkDrip4Ref.current, {
        x: x-10,
        y: y,
        duration: 0.03,
        ease: "power1.out"
      });

      gsap.to(eggWhiteTopRef.current, {
        x: x,
        y: y,
        duration: 0.08,
        ease: "power1.out",
      });

      gsap.to(eggWhite2Ref.current, {
        x: x,
        y: y,
        duration: 0.17,
        ease: "power1.out",

      });

      gsap.to(eggWhite3Ref.current, {
        x: x+20,
        y: y,
        duration: 0.25,
        ease: "power1.out",

      });

      gsap.to(eggWhite4Ref.current, {
        x: x ,
        y: y,
        duration: 0.3,
        ease: "power1.out",

      });

      gsap.to(eggWhite5Ref.current, {
        x: x ,
        y: y + 10,
        duration: 0.45,
        ease: "power1.out",

      });

      gsap.to(spatulaRef.current, {
        y: window.innerHeight + 200,
        x: x-125,
        duration: 0.3,
        ease: "power1.out"
      })

    };
    if (!swipeTransition){
      window.addEventListener("mousemove", handleMouseMove);
    }

    setCenterEgg(true);

    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [swipeTransition]);

  

  const onMouseDownSubmit = () => {
    setYolkTransitionSpeed(2);
    setYolkSize(95);
    
  };
  
  const onMouseReleaseSubmit = () => {
    setYolkTransitionSpeed(0.5);
    setYolkSize(70);
    setYolkDripLoc(true);
    setSwipeTransition(true);
    
    setTimeout(() => {
      if (yolkRef.current) {
        const yolkRect = yolkRef.current.getBoundingClientRect();
        const yolkY = yolkRect.top + yolkRect.height / 2 - window.innerHeight - 100; 
  
        gsap.to(spatulaRef.current, {
            y: yolkY+700,
            duration: 0.5,
            ease: "power1.out"
        });
      }
    },1500)
    
    
    setTimeout(() => {
      const delay = 0.2

      gsap.to(spatulaRef.current, {
        y: window.innerHeight + 200,
        duration: delay+.05,
        ease: "power1.out"
      })

      gsap.to(yolkRef.current, {
        y: window.innerHeight + 200 ,
        duration: delay+0.03,
        ease: "power1.out"
      });

      gsap.to(yolkDrip1Ref.current, {
        y: window.innerHeight + 200,
        duration: delay+0.1 ,
        ease: "power1.out"
      });
      gsap.to(yolkDrip2Ref.current, {
          y: window.innerHeight + 200,
          duration: delay+0.08 ,
          ease: "power1.out"
      });
      gsap.to(yolkDrip3Ref.current, {
          y: window.innerHeight + 200,
          duration: delay+0.05,
          ease: "power1.out"
      });

      gsap.to(yolkDrip4Ref.current, {
        y: window.innerHeight + 200-10,
        duration: delay+0.03,
        ease: "power1.out"
      });

      gsap.to(eggWhiteTopRef.current, {
        y: window.innerHeight + 200,
        duration: delay+0.08,
        ease: "power1.out",
      });

      gsap.to(eggWhite2Ref.current, {
        y: window.innerHeight + 200,
        duration: delay+0.17,
        ease: "power1.out",
      });

      gsap.to(eggWhite3Ref.current, {
        y: window.innerHeight + 200+20,
        duration: delay+0.25,
        ease: "power1.out",
      });

      gsap.to(eggWhite4Ref.current, {
        y: window.innerHeight + 200 ,
        duration: delay+0.3,
        ease: "power1.out",
      });

      gsap.to(eggWhite5Ref.current, {
        y: window.innerHeight + 200 ,
        duration: delay+0.45,
        ease: "power1.out",
      });
      
    }, 2000); 

    setTimeout(() => {
        setAnimationOver(true);
        
    }, 3000);

    setTimeout(() => {
      if (onFinish) onFinish();
    }, 3500)
  };

  useEffect(() => {
    setTransitionStyle(`width ${yolkTransitionSpeed}s, height ${yolkTransitionSpeed}s, left ${yolkTransitionSpeed}s, top ${yolkTransitionSpeed}s`);
  }, [yolkTransitionSpeed]);
    
    return(
        <div id="splashPage" onMouseDown={onMouseDownSubmit} onMouseUp={onMouseReleaseSubmit} style={{opacity:animationOver ? 0 : 1}}>
            <Image src='/images/Logo/Logo - Small - White.png' alt="Breakfast Time Logo" id="logoSmall" width="149" height="110"/>
            <Image src="/images/logo/Logo - Inline - White.png" id="logoBig" width={971} height={118} alt="Breakfast Time Logo"/>        
            
            <div className="filter" >
                <div className="frame">
                  <div id="splashEgg" style={{top: centerEgg? 0 : '50%', left: centerEgg? 0 : '50%'}}>
                    <div className="yolk" ref={yolkRef} 
                    style={{
                      height: yolkSize + 'px', 
                      width: yolkSize + 'px', 
                      top: -(yolkSize/2)+'px', 
                      left: -(yolkSize/2)+'px', 
                      transition: transitionStyle}}></div>
                    <div className="yolkDrip" id="yolkDrip1" style={{top: `${yolkDripLoc ? 72 : -0}px`}} ref={yolkDrip1Ref}></div>
                    <div className="yolkDrip" id="yolkDrip2" style={{top: `${yolkDripLoc ? 50 : -15}px`}} ref={yolkDrip2Ref}></div>
                    <div className="yolkDrip" id="yolkDrip3" style={{top: `${yolkDripLoc ? -5 : -25}px`}} ref={yolkDrip3Ref}></div>
                    <div className="yolkDrip" id="yolkDrip4" style={{top: `${yolkDripLoc ? 0 : -25}px`}} ref={yolkDrip4Ref}></div>
                    <div className="eggWhite" id="eggWhite1" ref={eggWhiteTopRef}></div>
                    <div className="eggWhite" id="eggWhite2" ref={eggWhite2Ref}></div>
                    <div className="eggWhite" id="eggWhite3" ref={eggWhite3Ref}></div>
                    <div className="eggWhite" id="eggWhite4" ref={eggWhite4Ref}></div>
                    <div className="eggWhite" id="eggWhite5" ref={eggWhite5Ref}></div>
                  </div>
                  <Image src='/images/SplashPage/Spatula.png' alt="Spatula" id="spatula" width='100' height='475'ref={spatulaRef} style={{display:swipeTransition ? 'block':'none'}}/>
                </div>
            </div>
        </div>
    )
}