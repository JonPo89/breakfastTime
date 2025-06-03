import React, { useEffect } from 'react';
import { animate, svg } from 'animejs';

const HomeIcon = ({homeActive}) => {
    const homeInactivePaths = ["M9.3,0.8c0.6-1.1,5.8-1.2,6.4,0.1c0.3,0.6,0,1.9-0.1,2.5c-0.5,3.4-0.4,6.9-0.2,10.4c0.1,1.3,0.3,2.7,0.2,4.1c0,0.4-0.1,0.8-0.3,1.2c-0.7,1.3-4.4,1-5.5,0.3c-1.2-0.8-0.4-4.6-0.4-6c-1.3,0.2-3.2-0.2-4.6-0.1c0.1,1.1,0.6,4.8,0.3,5.6c-0.3,0.6-0.7,0.9-1.4,1c-0.8,0.1-2.9,0.1-3.5-0.6C-0.1,18.7,0,18.1,0,17.5c0.2-2.1,0.4-4.2,0.4-6.3c0.1-2.4,0-4.8-0.1-7.1c0-0.9-0.1-1.8-0.1-2.7c0-0.2,0.1-0.6,0.3-0.7C0.8,0.6,1,0.6,1.2,0.6c2.4,0,4.1-0.5,4,2.5C5.2,4.8,5,6.5,5,8.2c1.3-0.1,2.6-0.2,3.9,0C9,7,8.9,1.5,9.3,0.8z",
        "M25.7,19.5c-8.8-0.1-10.6-9.8-6.7-16.1c0.4-0.7,0.9-1.3,1.6-1.8c1.2-0.9,4-1.6,5.4-1.5c2.8,0.2,5.7,1.3,7.1,3.9c2.3,4.2,1,11.7-3.2,14.4C28.7,19.2,27.2,19.5,25.7,19.5z",
        "M39.8,0.3c0.7-0.1,1.5-0.1,2.2,0.1c1.6,0.4,2.2,3.7,2.4,5c0.4,2.3,0.8,4.7,1.4,7c0.1,0.3,0.4,0.9,0.7,0.9c1.9-0.2,3.5-11.3,4.7-12.4c0.4-0.3,0.9-0.4,1.4-0.5c0.7-0.1,2.4-0.1,2.9,0.3C56,1,56.3,1.5,56.4,2c0.6,2,0.4,4.2,0.6,6.2c0.2,2.8,0.7,5.4,1.2,8.1c0.1,0.7,0.2,1.4-0.1,2c-0.7,1.4-4.3,1.7-5.1,0.6c-0.5-0.6-0.8-1.9-0.9-2.6c-0.4-2-0.6-4.2-0.6-6.2c-0.5,1.9-1.6,6.1-2.7,7.6c-0.7,0.9-1.6,0.8-2.6,0.8c-5-0.1-4.6-4.1-5.6-8.1l-0.6,3.3c-0.3,1.5-0.6,4.1-1.8,5.1c-0.7,0.6-2.1,0.7-2.8,0.2c-0.3-0.2-0.5-0.4-0.6-0.7c-0.4-1.4,1.2-5.7,1.6-7.3c0.4-1.7,0.7-3.4,1-5.1c0.2-1.3,0.4-2.6,0.4-4c0-0.3-0.1-0.7,0.2-0.9C38.3,0.4,39.3,0.4,39.8,0.3z",
        "M73.6,14.6c0.4,1,0.2,3.1-0.4,4c-0.3,0.4-0.8,0.7-1.4,0.8c-0.6,0.1-7.3,0-8.1-0.1c-1-0.1-2-0.6-2.7-1.4c-2.6-3-1.4-12.4,0.1-15.8c0.3-0.8,1-1.8,1.9-1.8c0.4,0,0.9-0.1,1.4-0.2c1.7-0.1,7.7-0.2,9,0.4C74.1,1,74.1,2.4,73.7,3c-0.4,0.6-2,0.5-2.6,0.5c-1.4-0.1-2.9-0.2-4.3-0.1c-0.5,1.1-0.9,2.3-1,3.5c1.4-0.1,5.1-0.5,5.8,1.1c0.4,1,0.3,2.6-0.6,3.3c-1,0.8-4.4,0.4-5.7,0.3l-0.1,0.1C64.7,16.1,72.2,11.3,73.6,14.6z"
        ];

    const homeActivePaths = ["M8.6,7.3c0.6-1.9,5.7-4.5,6.3-2.3c0.3,1,0,3.4-0.1,4.6c-0.5,6.3-0.4,12.4-0.2,18.6c0.1,2.4,0.3,4.9,0.2,7.4c0,0.7-0.1,1.4-0.3,2c-0.7,2.1-4.4-0.1-5.4-1.7C8,34,8.8,28.6,8.8,26.4c-1.2,0-3-0.8-4.3-1c0.1,1.4,0.6,6.5,0.3,7.4c-0.2,0.7-0.7,0.7-1.3,0.5c-0.8-0.3-2.7-1.6-3.2-2.7C-0.1,30,0,29.4,0,28.9c0.2-2,0.4-4.1,0.4-6.3c0-2.4,0-5-0.1-7.3c0-0.9-0.1-1.8-0.1-2.7c0-0.2,0.1-0.6,0.2-0.8c0.1-0.2,0.4-0.4,0.5-0.5c2.2-1.4,3.8-3,3.7,1.1c0,2.3-0.2,4.6-0.2,6.8c1.2-0.2,2.5-0.6,3.7-0.4C8.3,16.8,8.3,8.5,8.6,7.3z",
        "M25.2,41.2C15,37.8,15.5,18.6,18.3,8.6c0.4-1.3,0.9-2.7,1.6-3.8c1.2-2.1,4.1-4.2,5.6-4.2c2.9-0.1,6,1.9,7.4,7.7c2.2,10,2,22.2-3.3,31.2C28.3,41,26.5,41.6,25.2,41.2z",
        "M40,0C40.7,0,41.5,0,42.3,0.4c1.7,1.1,2.3,8.1,2.6,11.1c0.4,4.9,0.8,10.1,1.4,14.9c0.1,0.6,0.4,1.9,0.8,1.8c2-0.6,3.6-23.5,4.9-25.3c0.4-0.6,1-0.6,1.5-0.6c0.7,0.1,2.4,0.5,2.9,1.3c0.5,0.7,0.7,1.7,0.8,2.7c0.6,3.8,0.5,7.9,0.6,11.6c0.2,5.1,0.7,9.9,1.2,14.7c0.1,1.2,0.2,2.4-0.1,3.7c-0.7,2.7-4.3,4.4-5.2,2.6c-0.5-1-0.8-3.5-0.9-5c-0.4-4-0.6-8.3-0.6-12.5c-0.5,3.8-1.7,12.6-2.8,15.7c-0.7,2-1.6,1.9-2.7,2c-5.3,0.4-4.8-8.5-5.9-17.2c-0.3,2.9-0.4,4.4-0.6,7.3c-0.3,3.2-0.6,9.1-1.9,11.2c-0.7,1.2-2.2,1.6-3,0.5c-0.3-0.4-0.5-1-0.6-1.6c-0.4-3.1,1.2-12.6,1.7-16.1c0.5-3.6,0.8-7.5,1.1-11.2c0.2-2.9,0.4-5.8,0.4-8.7c0-0.6-0.1-1.5,0.2-2C38.4,0.2,39.4,0.1,40,0z",
        "M73.6,26c0.4,0.9,0.2,3-0.4,4.3C72.9,31,72.5,31.6,72,32c-0.5,0.5-6.9,3.8-7.6,3.9c-1,0.2-1.9-0.1-2.6-1.2c-2.5-4.2-1.3-21.4,0.1-26.7c0.3-1.2,1-2.6,1.9-2.2C64.1,6,64.6,6,65,6.2c1.6,0.6,7.3,3.9,8.4,5.4c0.6,0.8,0.6,2.1,0.3,2.6c-0.4,0.4-1.8-0.3-2.4-0.6c-1.3-0.6-2.7-1.3-4-1.8c-0.4,1.4-0.8,3-0.9,4.8c1.4,0.1,4.8,0.4,5.4,2.3c0.3,1.2,0.2,3-0.6,3.9c-0.9,1-4.1,0.9-5.4,0.9c0,0.1,0,0.1-0.1,0.2C65.3,30.5,72.4,23.1,73.6,26z"]

    let homeInactive1Path ;
    let homeActive1Path ;
    let homeActive1bPath;
    let homeInactive2Path ;
    let homeActive2Path;
    let homeActive2bPath ;
    let homeInactive3Path ;
    let homeActive3Path ;
    let homeActive3bPath ;
    let homeInactive4Path;
    let homeActive4Path;
    let homeActive4bPath;
 
    if (typeof window !== 'undefined'){
      homeInactive1Path = document.getElementById('homeInactive1');
     homeActive1Path = document.getElementById('homeActive1');
     homeActive1bPath = document.getElementById('homeActive1b');
     homeInactive2Path = document.getElementById('homeInactive2');
     homeActive2Path = document.getElementById('homeActive2');
     homeActive2bPath = document.getElementById('homeActive2b');
     homeInactive3Path = document.getElementById('homeInactive3');
     homeActive3Path = document.getElementById('homeActive3');
     homeActive3bPath = document.getElementById('homeActive3b');
     homeInactive4Path = document.getElementById('homeInactive4');
     homeActive4Path = document.getElementById('homeActive4');
     homeActive4bPath = document.getElementById('homeActive4b');
    }
    
      
    useEffect(() => {
      switchHome()
    },[homeActive])
  
    function switchHome(){
        animate(homeInactive1Path, {
            d: svg.morphTo(homeActive? homeActive1Path : homeActive1bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(homeInactive2Path, {
            d: svg.morphTo(homeActive? homeActive2Path : homeActive2bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(homeInactive3Path, {
            d: svg.morphTo(homeActive? homeActive3Path : homeActive3bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(homeInactive4Path, {
            d: svg.morphTo(homeActive? homeActive4Path : homeActive4bPath),
            ease: 'inOutCirc',
            duration: 500,
          });
    }

  return (
   <svg viewBox={homeActive? "0 0 73.9 41.6" : "0 0 73.9 20"} className="navIcon" id="homeIcon" style={{height: homeActive? '41.6px' : "20px"}}>
        <g >
          <path id="homeInactive1" d={homeInactivePaths[0]} />
          <path style={{ opacity: 0 }} id="homeActive1" d={homeActivePaths[0]} />
          <path style={{ opacity: 0 }} id="homeActive1b" d={homeInactivePaths[0]} />
          <path id="homeInactive2" d={homeInactivePaths[1]} />
          <path style={{ opacity: 0 }} id="homeActive2" d={homeActivePaths[1]} />
          <path style={{ opacity: 0 }} id="homeActive2b" d={homeInactivePaths[1]} />
          <path id="homeInactive3" d={homeInactivePaths[2]} />
          <path style={{ opacity: 0 }} id="homeActive3" d={homeActivePaths[2]} />
          <path style={{ opacity: 0 }} id="homeActive3b" d={homeInactivePaths[2]} />
          <path id="homeInactive4" d={homeInactivePaths[3]} />
          <path style={{ opacity: 0 }} id="homeActive4" d={homeActivePaths[3]} />
          <path style={{ opacity: 0 }} id="homeActive4b" d={homeInactivePaths[3]} />
        </g>
    </svg>
  );
};

export default HomeIcon;
