import {React} from 'react';
import './about.css'

export function About () {
    return (
        <div id="about" className="container">
            <h1>About</h1>
            <div id="aboutText">
            <p>Breakfast Time cards are funny, punny and not so runny cards for all occasions.
            <br/><br/>
            Though I’ve been designing and making cards for friends and family for years, it wasn’t until 2013 that Breakfast Time was established, with the aim to bring my love of puns and silly jokes to all, and feature them alongside some pretty damn fashionable (at least for the time) animals.  Starting on Etsy and selling at markets it was amazing to see how people reacted to something that I created.
            <br/><br/>
            Some of the original card designs:
            <br/><br/></p>
            <div id="oldCardDesigns">
                <img src={`${process.env.PUBLIC_URL}/images/oldDesigns/oldDesign1.png`} alt="Old Breakfast Time Card Design 01" />
                <img src={`${process.env.PUBLIC_URL}/images/oldDesigns/oldDesign2.png`} alt="Old Breakfast Time Card Design 02" />
                <img src={`${process.env.PUBLIC_URL}/images/oldDesigns/oldDesign3.png`} alt="Old Breakfast Time Card Design 03" />
            </div>
            <br/><br/><p>
            Then in 2023 I did some redesigns, bringing on more modern and versatile graphics to feature alongside the jokes, which sadly have stayed at the same standard over time!
            <br/><br/>
            <strong>Selling the cards is currently on hiatus.</strong>
            </p>
            </div>
        </div>
    )
}