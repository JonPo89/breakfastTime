'use client'

import Image from "next/image";
import { useEffect, useState } from "react";


export default function About(){

    const [hairToggle, setHairToggle] = useState(false);
    const [facialHair1No, setFacialHair1No] = useState(1);
    const [facialHair2No, setFacialHair2No] = useState(1);
    const [hair1No, setHair1No] = useState(1);
    const [hair2No, setHair2No] = useState(1);
    

    useEffect(() => {

        let interval =setInterval(() => {
        const facialRandNo = 1+(Math.floor(Math.random() * 3));
        const hairRandNo = 1+(Math.floor(Math.random() * 5));
        if (hairToggle === true){
            setFacialHair2No(facialRandNo);
            setHair2No(hairRandNo);
            setHairToggle(false);
        } else {
            setFacialHair1No(facialRandNo);
            setHair1No(hairRandNo);
            setHairToggle(true);
        }

        }, 3000);

        return () => clearInterval(interval);
    },[hairToggle]);

    const copyEmail = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText("jonporter89@gmail.com").then(() => {
                alert("Email copied to clipboard.");
            }).catch(err => {
                console.error("Failed to copy email:", err);
                alert("Failed to copy email. Please try again.");
            });
        } else if(typeof window !== 'undefined') {
            const textArea = document.createElement("textarea");
            textArea.value = "jonporter89@gmail.com";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
    
            try {
                document.execCommand('copy');
                alert("Email copied to clipboard.");
            } catch (err) {
                console.error("Fallback: Failed to copy email:", err);
                alert("Failed to copy email. Please try again.");
            }
    
            document.body.removeChild(textArea);
        }
    }
    
    return(
        <div className="page">
            <div id="aboutPage">
                <div id="aboutLeft">
                    <p id="aboutParagraphA" className="introParagraphs">
                        Hi, I'm Jon Porter
                    <br/><br/>
                    I’ve been making cards for friends and family for years, but it wasn’t until 2013 in Melbourne, Australia that Breakfast Time was officially launched.
                    Combining two of my loves, silly, corny jokes with some fun and funky animals in truly impeccable fashion, <strong>Breakfast Time</strong> started on Etsy, and expanded to markets and a few select stores.  It was incredible seeing how people reacted to things that I created!
                    <br/><br/>
                    Here are a few of the original card designs of the original animals in not at all dated fashion:
                    <br/><br/>
                    In 2023 after years of hiatus I did a few redesigns, bringing in more modern and versatile graphics.  Though the illustrations have been updated, I can confidently say my sense of humour has not!
                    </p>
                    <div id="aboutOldDesigns">
                        <Image 
                            src="/images/oldDesigns/oldDesign1.png" 
                            height={1000} 
                            width={1000} 
                            alt="Old breakfast time design of a dinosaur celebrating like it's 65 million bc" 
                            className="oldDesigns"
                        />
                        <Image 
                            src="/images/oldDesigns/oldDesign2.png" 
                            height={1000} 
                            width={1000} 
                            alt="Old breakfast time design of a very cool cat" 
                            className="oldDesigns"
                        />
                        <Image 
                            src="/images/oldDesigns/oldDesign3.png" 
                            height={1000} 
                            width={1000} 
                            alt="Old breakfast time design of a unicorn joke that definitely isn't corny" 
                            className="oldDesigns"
                        />
                    </div>
                    <p className="introParagraphs">
                    Thanks for visiting my website!
                    <br/><br/>
                    Sadly, sales of the cards are currently on hiatus, but if you have any questions or inquiries please feel free to contact me at <span onClick={copyEmail} style={{cursor:'pointer', fontWeight:'bold', color:'blue', textDecoration:'underline'}} className="link">jonporter89@gmail.com</span>.

                    </p>
                </div>
                <div id="aboutRight">
                    <div className="imageContainer">
                        <div className="facialHair" style={{left:hairToggle?'0':'-360px'}}>
                            <Image 
                                src={`/images/face/facial hair 0${facialHair1No}.png`} 
                                width={360} 
                                height={360}
                                alt="Facial Hair A" />
                            <Image src={`/images/face/facial hair 0${facialHair2No}.png`} width={360} height={360} alt="Facial Hair B"/>
                        </div>
                        <div className="hair" style={{top:hairToggle?'-365px':'-725px'}}>
                            <Image src={`/images/face/hair0${hair1No}.png`} width={360} height={360} alt="Hair A"/>
                            <Image src={`/images/face/hair0${hair2No}.png`} width={360} height={360} alt="Hair B"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}