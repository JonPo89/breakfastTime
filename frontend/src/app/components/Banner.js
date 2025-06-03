
"use client"
import { useState, useEffect } from "react"

export default function Banner(){
    const [ hover, setHover ] = useState(false);
    const [ expand, setExpand ] = useState(false);
    const [ bannerTop, setBannerTop ] = useState('- 1rem - 12px)')

    useEffect(() => {
        if (hover){
            
        }
    })

    return(
        <div id="banner" style={{paddingBottom:hover?'1rem' : '0.5rem'}} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={()=> setExpand(!expand)}>
            <p id="warning">This is not a real shop</p>
            {expand ? 
                <p id="bannerText">This website is purely indicative and not a real shop.  Please feel free to explore, create users, "purchase" cards, and interact with it as you would an online store.  <br/><br/>If you have any questions please email jonporter89@gmail.com</p>
                :
                null
            }
        </div>
    )
}