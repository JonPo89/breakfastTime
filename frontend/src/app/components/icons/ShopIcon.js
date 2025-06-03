import React, { useEffect } from 'react';
import { animate, svg } from 'animejs';

const ShopIcon = ({shopActive}) => {
    const shopInactivePaths = [
        "M0.6,18.1c-0.7-1-0.8-2.5-0.4-3.6c0.2-0.6,0.6-1.1,1-1.4c1.5-0.9,5.5,0.7,6.1-0.4c0.5-0.9-3.1-2.2-3.8-2.6C1.2,8.6-0.9,4.8,1,2.2c1.6-2.2,4.4-2.1,6.8-2c1.4,0.1,3.3,0.2,4.4,1.3c0.9,0.9,0.9,2.6-0.4,3.2C11.2,5,7.5,3.8,7.5,5.4c0,1,3.6,3.3,4.6,5.4c1.7,3.4,0.8,6.4-2.8,7.8C7.7,19.1,1.7,19.6,0.6,18.1z",
        "M23.6,0.9C24.2-0.2,29.4-0.3,30,1c0.3,0.6,0,1.9-0.1,2.5c-0.5,3.4-0.4,6.9-0.2,10.4c0.1,1.3,0.3,2.7,0.2,4.1c0,0.4-0.1,0.8-0.3,1.2c-0.7,1.3-4.4,1-5.5,0.3c-1.2-0.8-0.4-4.6-0.4-6c-1.3,0.2-3.1-0.2-4.6-0.1c0.1,1.1,0.6,4.8,0.3,5.6c-0.3,0.6-0.7,0.9-1.4,1c-0.8,0.1-2.9,0.1-3.5-0.6c-0.3-0.5-0.3-1.1-0.2-1.7c0.2-2.1,0.4-4.2,0.4-6.3c0.1-2.4,0-4.8-0.1-7.1c0-0.9-0.1-1.8-0.1-2.7c0-0.2,0.1-0.6,0.3-0.7c0.2-0.1,0.4-0.1,0.6-0.1c2.4,0,4.1-0.5,4,2.5c0,1.7-0.2,3.4-0.3,5.1c1.3-0.1,2.6-0.2,3.9,0C23.3,7,23.2,1.5,23.6,0.9z",
        "M40,19.5c-8.8-0.1-10.6-9.8-6.7-16.1c0.4-0.7,0.9-1.3,1.5-1.8c1.2-0.9,4-1.6,5.4-1.5C43.2,0.3,46,1.4,47.5,4c2.3,4.2,1,11.7-3.2,14.4C43,19.2,41.5,19.5,40,19.5z",
        "M54.4,19.7c-0.8,0.2-1.8,0.3-2.7,0.1c-0.5-0.1-1-0.4-1.3-0.8c-0.6-0.7-0.6-1.8-0.5-2.6c0.1-1.7,0.4-3.4,0.6-5.1c0.2-2,0.1-4.1,0.1-6.1c0-0.9-0.3-2.6-0.2-3.4c0.2-2,3.8-2.2,4.8-0.7c0.8-0.3,1.6-0.5,2.5-0.5c9.2-0.2,9.1,12.9,1.4,13.6c-0.9,0.1-1.9,0.1-2.8-0.1C56.5,15.9,56.9,19,54.4,19.7z"
    ]
    
    const shopActivePaths = [
        "M0.5,29.7c-0.6-1.4-0.7-2.9-0.3-3.9c0.2-0.5,0.5-1,0.9-1.2c1.4-0.7,5,2,5.6,0.5c0.5-1.2-2.9-3.3-3.5-3.8c-2.3-1.8-4.1-4.6-2.4-8.4c1.4-3.2,4-5.1,6.2-6.3c1.4-0.7,3.2-1.4,4.3,0.1c0.9,1.2,0.9,4.3-0.4,5.5c-0.6,0.6-4.2-0.2-4.2,2.2c0,1.5,3.4,4.5,4.5,8.1C12.9,28.3,12,34,8.5,34.6C7,34.8,1.5,31.8,0.5,29.7z",
        "M23.1,2.2c0.6-2.3,6.1-3.2,6.7-0.5c0.3,1.2,0,4.1-0.1,5.5c-0.5,7.4-0.5,14.9-0.3,22.3c0.1,2.9,0.3,5.8,0.2,8.8c0,0.8-0.1,1.7-0.3,2.5c-0.8,2.8-4.7,1.7-5.8-0.1c-1.2-1.9-0.4-9.7-0.4-12.6c-1.4,0.2-3.3-0.6-4.8-0.6c0.1,2.2,0.7,9.6,0.3,11.1c-0.3,1.1-0.8,1.5-1.4,1.5c-0.8,0-3-0.8-3.5-2.3c-0.3-1-0.3-2.1-0.2-3.1c0.2-3.7,0.4-7.5,0.4-11.4c0.1-4.3-0.1-8.7-0.1-13c0-1.6-0.1-3.3-0.1-4.9c0-0.3,0.1-1,0.3-1.3c0.2-0.3,0.4-0.4,0.6-0.4c2.4-0.8,4.2-2.3,4.1,3.7c0,3.4-0.2,6.8-0.3,10.2c1.4-0.2,2.7-0.6,4.1-0.2C22.7,15.1,22.7,3.7,23.1,2.2z",
        "M40.5,41.1c-10.9,0-9.8-25.6-7.1-34.2c0.4-1.4,1-2.8,1.6-3.8c1.3-1.9,4.2-3.1,5.8-2.6c3,0.9,5.9,3.9,7.4,9.3C50.4,19,49.7,29.7,45,38C43.7,39.9,41.8,41.1,40.5,41.1z",
        "M55.2,36.8c-0.8,0.8-1.8,1.4-2.7,1.3c-0.5,0-1-0.3-1.3-0.9c-0.6-1.1-0.6-3-0.5-4.6c0.1-3.2,0.4-6.3,0.6-9.4c0.2-3.7,0.1-7.3,0.1-11c0-1.7-0.3-4.8-0.2-6.1c0.2-3.6,3.7-2.2,4.7,0.7c0.8-0.1,1.6,0,2.4,0.5c8.7,4.6,8.5,16.6,1.3,19.4c-0.9,0.3-1.7,0.6-2.6,0.4C57.2,30.2,57.6,34.5,55.2,36.8z"                                
    ]
 
    let shopInactive1Path;
    let shopActive1Path;
    let shopActive1bPath;
    let shopInactive2Path;
    let shopActive2Path;
    let shopActive2bPath;
    let shopInactive3Path;
    let shopActive3Path;
    let shopActive3bPath;
    let shopInactive4Path;
    let shopActive4Path;
    let shopActive4bPath ;

    if (typeof window!=='undefined'){
      shopInactive1Path = document.getElementById('shopInactive1');
      shopActive1Path = document.getElementById('shopActive1');
      shopActive1bPath = document.getElementById('shopActive1b');
      shopInactive2Path = document.getElementById('shopInactive2');
      shopActive2Path = document.getElementById('shopActive2');
      shopActive2bPath = document.getElementById('shopActive2b');
      shopInactive3Path = document.getElementById('shopInactive3');
      shopActive3Path = document.getElementById('shopActive3');
      shopActive3bPath = document.getElementById('shopActive3b');
      shopInactive4Path = document.getElementById('shopInactive4');
      shopActive4Path = document.getElementById('shopActive4');
      shopActive4bPath = document.getElementById('shopActive4b');
    }

    useEffect(() => {
        switchShop();
    },[shopActive])
  
    function switchShop(){
        animate(shopInactive1Path, {
            d: svg.morphTo(shopActive? shopActive1Path : shopActive1bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(shopInactive2Path, {
            d: svg.morphTo(shopActive? shopActive2Path : shopActive2bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(shopInactive3Path, {
            d: svg.morphTo(shopActive? shopActive3Path : shopActive3bPath),
            ease: 'inOutCirc',
            duration: 500,
          });

          animate(shopInactive4Path, {
            d: svg.morphTo(shopActive? shopActive4Path : shopActive4bPath),
            ease: 'inOutCirc',
            duration: 500,
          });


    }

  return (
      <svg viewBox={shopActive? "0 0 64.8 42.5" : "0 0 64.6 20"} className="navIcon" id="homeIcon" style={{height:shopActive? "42.5px": "20px"}}>
        <g>
          <path id="shopInactive1" d={shopInactivePaths[0]} />
          <path style={{ opacity: 0 }} id="shopActive1" d={shopActivePaths[0]} />
          <path style={{ opacity: 0 }} id="shopActive1b" d={shopInactivePaths[0]} />
          <path id="shopInactive2" d={shopInactivePaths[1]} />
          <path style={{ opacity: 0 }} id="shopActive2" d={shopActivePaths[1]} />
          <path style={{ opacity: 0 }} id="shopActive2b" d={shopInactivePaths[1]} />
          <path id="shopInactive3" d={shopInactivePaths[2]} />
          <path style={{ opacity: 0 }} id="shopActive3" d={shopActivePaths[2]} />
          <path style={{ opacity: 0 }} id="shopActive3b" d={shopInactivePaths[2]} />
          <path id="shopInactive4" d={shopInactivePaths[3]} />
          <path style={{ opacity: 0 }} id="shopActive4" d={shopActivePaths[3]} />
          <path style={{ opacity: 0 }} id="shopActive4b" d={shopInactivePaths[3]} />

        </g>
      </svg>

  );
};

export default ShopIcon;
