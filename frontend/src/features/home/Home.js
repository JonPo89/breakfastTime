import React from "react";
import './home.css';


export function Home () {

    return (
        <div id="home" className="container">
            <p>Welcome to</p>
            <br/>
            <img id="homeLogo" src={`${process.env.PUBLIC_URL}/images/breakfasttime logo.png`} alt="Breakfast Time Logo" />
            <br/><br/>
            <p>
                This is an indicative e-commerce site created by Jon Porter in order to illustrate my skills in creating both the front and back end foundations of a web app, and how to get them to communicate. 
                <br/><br/>
                All designs are created by me.
                <br /> <br />
                To view more of my work, please visit 
                <br/>
                <a href="https://www.jonporterfolio.com" target="_blank" rel="noreferrer">www.jonporterfolio.com</a>

            </p>
        </div>
    )
}
