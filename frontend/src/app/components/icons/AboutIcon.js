import React, { useEffect } from 'react';
import { animate, svg } from 'animejs';

const AboutIcon = ({aboutActive}) => {

    const aboutInactivePaths = ["M2.1,19.3c-0.6,0.6-1.7,0.8-2.1-0.1C-0.5,17.8,3.2,5.5,4,3.3C4.3,2.4,4.9,1.6,5.6,1C7,0,8.5-0.1,10.1,0.4c0.7,0.2,1.4,0.6,1.9,1.2c0.7,0.8,1.1,1.9,1.3,2.8c0.6,2.2,0.7,4.5,1.1,6.7c0.4,1.9,0.9,3.7,1.3,5.5c0.1,0.6,0.3,1.3,0.1,1.9c-0.2,0.5-0.8,0.8-1.3,0.9c-1.1,0.3-3.9,0.7-4.5-0.5c-0.5-1-0.8-3.9-0.9-5.1c-1.7-0.1-3.4-0.1-5.1-0.1C3.6,15.1,2.9,18.4,2.1,19.3z",
        "M20.4,19.9c-3.7,0.1-3.4-2.6-3.1-5.3c0.3-3.4,0.3-6.8,0.1-10.2c-0.1-0.8-0.2-1.6-0.2-2.3c0.2-2.2,4.1-2.4,5-1.4c0.3,0.3,0.5,0.8,0.6,1.2c6.2-5.3,12.8,3.1,7,7.5c5.8,2.8,4.3,10.9-2.7,10.3c-1.3-0.1-2.5-0.6-3.6-1.3C22.9,19.6,21.7,19.9,20.4,19.9z",
        "M43.1,19.8c-9-0.1-10.9-10-6.8-16.5c0.4-0.7,0.9-1.3,1.6-1.8c1.2-0.9,4.1-1.6,5.6-1.5c2.9,0.2,5.8,1.3,7.3,4c2.3,4.3,1,11.9-3.2,14.7C46.1,19.5,44.6,19.8,43.1,19.8z",
        "M59.4,19.7c-7.2-1-6.2-9.6-6.2-14.8c0-0.9-0.2-2.4,0.2-3.2c0.2-0.4,0.6-0.8,1-1c1.4-1,3.2-0.9,4.6,0.1c0.4,0.3,0.7,0.7,0.9,1.1c1.2,2.9-2.3,15.2,3.4,14.6c5.6-0.6,2.4-12.3,3.4-14.7c0.2-0.4,0.5-0.8,1-1c0.8-0.3,2.5,0,3.1,0.6c0.3,0.3,0.4,0.8,0.5,1.2c0.1,0.9-0.1,1.8-0.2,2.7c-0.4,3-0.9,6-0.6,9c0.1,1.2,1,3.5,0.8,4.4c-0.3,1.6-3.6,1.8-4-1.3C64.9,19.4,62.4,20.2,59.4,19.7z",
        "M81.9,18.5c-0.6,2-5.2,1.6-5.8,0.9c-0.2-0.2-0.2-0.4-0.2-0.7c-0.1-0.5,0-1,0-1.6c0.2-2.7,0.5-5.4,0.6-8.1c0-2,0.1-4-0.1-6c-1.7-0.1-5.2,0.8-4.2-2.2c0.1-0.3,0.2-0.3,0.4-0.5c0.7-0.4,7.8,0.1,9.3,0.1c0.9,0,3.7-0.3,4.3,0.4c0.4,0.5,0.4,1.5-0.1,2c-0.7,0.8-3.2,0.6-4.2,0.5C81.8,6.1,82.5,16.7,81.9,18.5z"]

    const aboutActivePaths = ["M1.9,34.5c-0.5,0.3-1.6-0.2-1.9-1.3c-0.5-1.6,2.8-14.5,3.6-17.5c0.3-1.3,0.8-2.6,1.5-3.7c1.3-2,2.7-3.1,4.2-3.1c0.7,0,1.3,0.4,1.8,1.2c0.6,1.1,1,2.8,1.3,4.4c0.6,3.6,0.6,7.6,1.1,11.6c0.4,3.3,0.9,6.7,1.3,10.2c0.1,1.1,0.3,2.5,0.1,3.5c-0.2,0.9-0.8,1.2-1.3,1.2c-1.1,0.1-3.8-0.6-4.4-2.8c-0.5-1.8-0.4-7.7-0.9-8.2c-0.4-0.5-3.2-0.8-4.8-1.3C3.3,30.3,2.6,34.1,1.9,34.5z",
        "M19.5,44c-3.7-1.1-3.4-6.2-3.1-11.3c0.3-6.4,0.3-13,0.1-19.4c-0.1-1.4-0.2-2.9-0.2-4.4c0.2-4.3,4.1-6,5.1-4.4c0.3,0.6,0.5,1.5,0.6,2.4c6.7-14.5,10.3,9.4,7.2,15.6c6,6.2,4.5,25.9-2.8,22.9c-1.3-0.5-2.6-1.9-3.7-3.7C22.1,44.2,20.8,44.4,19.5,44z",
        "M43.1,47.7C31.8,45.7,33,18.6,35.9,8.3c0.5-1.6,1-3.2,1.7-4.4c1.3-2.3,4.3-4.1,5.8-3.9c3,0.5,6.1,3.4,7.6,9.9c2.1,11.2,1.9,24.6-3.4,34.9C46.3,46.8,44.4,47.9,43.1,47.7z",
        "M60.1,45.5c-7.9-2.7-6.5-23.5-6.4-33.3c0-2-0.2-5.6,0.3-7.3c0.2-1,0.7-1.7,1.1-2.3c1.4-2,3.4-1.5,4.8,1c0.4,0.7,0.7,1.6,0.9,2.7c0.7,9.3,1.7,31.5,3.5,31.3c2.6-0.2,2.9-20.3,3.4-29.8c0.2-0.8,0.5-1.5,1-1.6c0.8-0.3,2.5,0.9,3,2.3c0.3,0.7,0.4,1.6,0.5,2.4c0.1,1.6-0.1,3.3-0.2,4.8c-0.4,5.3-0.9,11-0.6,16.5c0.1,2.1,1,6,0.8,7.9c-0.3,3-3.6,4.8-4-1.2C65.8,43.1,62.3,46.3,60.1,45.5z",
        "M82.3,34.9c-0.6,2.8-4.9,5-5.5,4c-0.2-0.3-0.2-0.5-0.2-1c-0.1-0.8,0-1.7,0-2.5c0.2-4.4,0.5-8.7,0.5-13c0-3.1,0.1-6.2-0.1-9.4c-1.7-0.7-5.1-0.3-4.1-5.2c0.1-0.4,0.2-0.6,0.4-0.7c0.7-0.4,7.5,3.8,8.8,4.6c0.9,0.5,3.4,1.8,3.9,2.9c0.4,0.8,0.4,1.7,0,2c-0.7,0.5-2.9-0.7-3.8-1.1C82.2,19.1,82.8,32.3,82.3,34.9z"]

 
    const aboutInactive1Path = document.getElementById('aboutInactive1');
    const aboutActive1Path = document.getElementById('aboutActive1');
    const aboutActive1bPath = document.getElementById('aboutActive1b');
    const aboutInactive2Path = document.getElementById('aboutInactive2');
    const aboutActive2Path = document.getElementById('aboutActive2');
    const aboutActive2bPath = document.getElementById('aboutActive2b');
    const aboutInactive3Path = document.getElementById('aboutInactive3');
    const aboutActive3Path = document.getElementById('aboutActive3');
    const aboutActive3bPath = document.getElementById('aboutActive3b');
    const aboutInactive4Path = document.getElementById('aboutInactive4');
    const aboutActive4Path = document.getElementById('aboutActive4');
    const aboutActive4bPath = document.getElementById('aboutActive4b');
    const aboutInactive5Path = document.getElementById('aboutInactive5');
    const aboutActive5Path = document.getElementById('aboutActive5');
    const aboutActive5bPath = document.getElementById('aboutActive5b');

      useEffect(() => {
        switchAbout()
      },[aboutActive])

    function switchAbout(){
        animate(aboutInactive1Path, {
            d: svg.morphTo(aboutActive? aboutActive1Path : aboutActive1bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(aboutInactive2Path, {
            d: svg.morphTo(aboutActive? aboutActive2Path : aboutActive2bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(aboutInactive3Path, {
            d: svg.morphTo(aboutActive? aboutActive3Path : aboutActive3bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(aboutInactive4Path, {
            d: svg.morphTo(aboutActive? aboutActive4Path : aboutActive4bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(aboutInactive5Path, {
            d: svg.morphTo(aboutActive? aboutActive5Path : aboutActive5bPath),
            ease: 'inOutCirc',
            duration: 500,
          });
    }

  return (
      <svg viewBox={aboutActive? "0 0 86.4 47.7" : "0 0 86.4 20"} className="navIcon" id="homeIcon" style={{height:aboutActive? "47.7px" : "20px"}}>
        <g>
          <path id="aboutInactive1" d={aboutInactivePaths[0]} />
          <path style={{ opacity: 0 }} id="aboutActive1" d={aboutActivePaths[0]} />
          <path style={{ opacity: 0 }} id="aboutActive1b" d={aboutInactivePaths[0]} />
          <path id="aboutInactive2" d={aboutInactivePaths[1]} />
          <path style={{ opacity: 0 }} id="aboutActive2" d={aboutActivePaths[1]} />
          <path style={{ opacity: 0 }} id="aboutActive2b" d={aboutInactivePaths[1]} />
          <path id="aboutInactive3" d={aboutInactivePaths[2]} />
          <path style={{ opacity: 0 }} id="aboutActive3" d={aboutActivePaths[2]} />
          <path style={{ opacity: 0 }} id="aboutActive3b" d={aboutInactivePaths[2]} />
          <path id="aboutInactive4" d={aboutInactivePaths[3]} />
          <path style={{ opacity: 0 }} id="aboutActive4" d={aboutActivePaths[3]} />
          <path style={{ opacity: 0 }} id="aboutActive4b" d={aboutInactivePaths[3]} />
          <path id="aboutInactive5" d={aboutInactivePaths[4]} />
          <path style={{ opacity: 0 }} id="aboutActive5" d={aboutActivePaths[4]} />
          <path style={{ opacity: 0 }} id="aboutActive5b" d={aboutInactivePaths[4]} />
        </g>
      </svg>

  );
};

export default AboutIcon;
