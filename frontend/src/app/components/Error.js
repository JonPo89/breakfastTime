"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { selectProductErrorMessage } from "@/store/productSlice";
import { selectOrderErrorMessage } from "@/store/orderSlice";
import { selectServerError } from "@/store/userSlice";

export default function Error ({location}) {
    const [loc, setLoc] = useState("Home")
    const productErrorMessage = useSelector(selectProductErrorMessage);
    const orderErrorMessage = useSelector(selectOrderErrorMessage);
    const serverError = useSelector(selectServerError);


    useEffect(()=> {
        if (serverError){
            setLoc("Server");
        } else if(location){
            setLoc(location)
        }else{
            setLoc("Home")
        }
    },[])

    const refreshPage = () => {window.location.reload();};

    const copyEmail = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText("jonporter89@gmail.com").then(() => {
                alert("Email copied to clipboard.");
            }).catch(err => {
                console.error("Failed to copy email:", err);
                alert("Failed to copy email. Please try again.");
            });
        } else if (typeof window !== 'undefined'){
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
            <div id="error">
                <p>Woopsies, we seem to have encountered an error!</p>
                {loc === 'Server' ?
                    <>
                        <p>There seems to be an issue with the server.<br/>
                        <span className="link" onClick={() => refreshPage()} style={{cursor:'pointer'}}>Refreshing the page may wake it up</span>
                        <br/>If that doesn't work I'm sorry, give me an email on <span className="link" onClick={()=>copyEmail()} style={{cursor:'pointer'}}>jonporter89@gmail.com</span> and I can fix it ASAP</p>

                    </>
                    :
                    loc === "User" ? 
                    <>
                        {orderErrorMessage ? <p>{orderErrorMessage}.<br/></p> : serverError ? <p>{serverError}</p> : <p>Please log in.</p>}
                        <Link className="link" href="/user">Return to User page</Link>
                    </>
                    : loc === "Product" ?
                    <>
                        {productErrorMessage ? <p>{productErrorMessage}.<br/></p> : null}
                        <Link className="link" href="/shop">Return to Shop page</Link>
                    </>
                    :  loc === "NoLogin" ?
                    <>
                        <p>You need to be signed in to view that</p>
                        <Link className="link" href="/user">Return to User page</Link>
                    </>
                    :
                    <Link className="link" href="/">Return Home</Link>
                }
                
                
            </div>
                <Image src="/images/CharacterImages/lost.png" id="lostDog" width={1484} height={1184} alt="You are lost"/>
        </div>

    )
}