"use client";
import Image from "next/image";
import { useState, useEffect, useRef} from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoPerson  } from "react-icons/io5";
import HomeIcon from "./icons/HomeIcon";
import AboutIcon from "./icons/AboutIcon";
import ShopIcon from "./icons/ShopIcon";
import { BiFork, BiKnife } from "react-icons/bi";
import { selectCart } from "@/store/cartSlice";
import { selectIsLoggedIn } from "@/store/userSlice";
import { useSelector } from "react-redux";
import { IoCloseCircle, IoMenu  } from "react-icons/io5";

export default function Header({splashPage}){
    const pathname = usePathname();
    const [homeActive, setHomeActive] = useState(false);
    const [aboutActive, setAboutActive] = useState(false);
    const [shopActive, setShopActive] = useState(false);
    const [userActive, setUserActive] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [headerDrop, setHeaderDrop] = useState([false, false, false]);
    const [cartBorder, setCartBorder] = useState([]);
    const [burgerToggle, setBurgerToggle] = useState(false);
    const headerRef = useRef();

    const cartItems = useSelector(selectCart);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        const r1 = Math.floor(Math.random()*60) + 20;
        const r2 = Math.floor(Math.random()*60) + 20;
        const r3 = Math.floor(Math.random()*60) + 20;
        const r4 = Math.floor(Math.random()*60) + 20;
        setCartBorder([r1, r2, r3, r4]);
    },[])

    useEffect(() => { 
        if(pathname === '/'){
            setHomeActive(true);
            setAboutActive(false);
            setShopActive(false);
            setUserActive(false);
        } else if(pathname === '/about'){
            setHomeActive(false);
            setAboutActive(true);
            setShopActive(false);
            setUserActive(false);
        } else if(pathname === '/shop'){
            setHomeActive(false);
            setAboutActive(false);
            setShopActive(true);
            setUserActive(false);
        } else if(pathname ==='/user') {
            setHomeActive(false);
            setAboutActive(false);
            setShopActive(false);
            setUserActive(true);
        } else {
            setHomeActive(false);
            setAboutActive(false);
            setShopActive(false);
            setUserActive(false);
        }
    },[pathname])

    useEffect (() => {
        if(!splashPage){
            setHeaderDrop([true, false, false]);
            const timer1 = setTimeout(() => {
                setHeaderDrop([true, true, false])
            },300);
            const timer2 = setTimeout(() => {
                setHeaderDrop([true, true, true])
            },600);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            }
        }
    },[splashPage])

    useEffect (() => {
        if (cartItems && cartItems.length > 0) {
            const sumOfQty = cartItems.reduce((sum, item) => {
                return sum + item.quantity;
            },0)
            setCartQty(sumOfQty);
        } else {
            setCartQty(0);
        }

        const r1 = Math.floor(Math.random()*50) + 25;
        const r2 = Math.floor(Math.random()*50) + 25;
        const r3 = Math.floor(Math.random()*50) + 25;
        const r4 = Math.floor(Math.random()*50) + 25;
        setCartBorder([r1, r2, r3, r4]);
    }, [cartItems]);

    useEffect (() => {
        function handleOutsideClick(event){
            if ( headerRef.current && !headerRef.current.contains(event.target)){
                setBurgerToggle(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, []);
   

    return (
        <header onClick={burgerToggle ? ()=>setBurgerToggle(false) : null} ref={headerRef}>
            <Link href="/">
                <Image src='/images/logo/Logo - Small - White.png' id='logoSmall' width={149} height={110} alt="Breakfast Time Logo"/>
                <Image src="/images/logo/Logo - Inline - White.png" id="logoBig" width={971} height={118} alt="Breakfast Time Logo"/>
            </Link>
            <nav>
                <Link href="/">
                    <div className='navContainer' id="homeContainer" alt="Return to home page" style={{top: headerDrop[0] ? 0 : '-5rem'}}>
                        <HomeIcon homeActive={homeActive}/>
                        
                    </div>
                </Link>
                <Link href="/about">
                    <div className="navContainer" id="aboutContainer"  alt="Read about Breakfast Time" style={{top: headerDrop[1] ? 0 : '-5rem'}}>
                        <AboutIcon aboutActive={aboutActive}/>
                    </div>
                </Link>
                <Link href="/shop">
                    <div className="navContainer" id="shopContainer"  alt="Browse our products" style={{top: headerDrop[2] ? 0 : '-5rem'}}>
                        <ShopIcon shopActive={shopActive}/>
                    </div>
                </Link>
            </nav>
            <div id="userCart">
                <Link href="/user">
                    <div id="userBox">
                        <BiFork id="forkIcon" className="userCutlery" style={{display: isLoggedIn ? 'inline' : 'none'}}/>
                        <IoPerson id="userIcon" style={{color: userActive ? 'white' : ''}}/>
                        <BiKnife id="knifeIcon" className="userCutlery" style={{display: isLoggedIn ? 'inline' : 'none'}}/>
                    </div>
                </Link>
                <Link href="/cart">
                    <div id="cartIcon" style={{borderRadius: cartItems && cartItems.length > 0 ? `${cartBorder[0]}% ${100-cartBorder[0]}% ${cartBorder[1]}% ${100-cartBorder[1]}% / ${cartBorder[2]}% ${cartBorder[3]}% ${100-cartBorder[3]}% ${100-cartBorder[2]}%` : '50%'}}>
                        {cartQty > 50 ? (
                            
                            <div id="smileyCart">
                                <h2>:)</h2>
                            </div>
                            
                        ) : cartItems && cartItems.length > 0 ? (
                            <h2>{cartQty}</h2>
                        )
                            :
                            <div id="noItemsCart">
                            
                        </div>
                        }
                        
                    </div>
                </Link>
            </div>
            <div id="burgerMenu" >
                <div id="burgerToggle" 
                    onClick={()=>setBurgerToggle(!burgerToggle)} 
                    style={{
                        borderRadius: burgerToggle ? '55% 45% 70% 30% / 30% 54% 46% 70%' : '50% 50% 50% 50% / 64% 65% 35% 36%', 
                        aspectRatio: burgerToggle ? '1/1' : '3/4', 
                        fontSize: burgerToggle ? '2.5rem' : '3rem',
                        top: headerDrop[0]? '0' : '-6rem'}}>
                    <IoMenu  style={{display: burgerToggle ? 'none' : 'block'}}/>
                    <IoCloseCircle style={{display: burgerToggle ? 'block' : 'none'}}/>
                </div>
                <div id="burgerNav" style={{right: burgerToggle? '3rem' : '-8.5rem'}} >
                    <Link href="/" className="burgerLink">Home</Link>
                    <Link href="/about" className="burgerLink">About</Link>
                    <Link href="/shop" className="burgerLink">Shop</Link>
                    <div id="burgerUserCart">
                        <Link href="/user">
                            <div id="burgerUserBox">
                                <BiFork id="burgerForkIcon" className="burgerUserCutlery" style={{display: !isLoggedIn ? 'none' : 'block'}}/>
                                <IoPerson id="burgerUserIcon" />
                                <BiKnife id="burgerKnifeIcon" className="burgerUserCutlery" style={{display: !isLoggedIn ? 'none' : 'block'}}/>
                            </div>
                        </Link>
                        <Link href="/cart">
                            <div 
                                id="burgerCartIcon" 
                                style={{borderRadius: cartItems && cartItems.length > 0 ? `${cartBorder[0]}% ${100-cartBorder[0]}% ${cartBorder[1]}% ${100-cartBorder[1]}% / ${cartBorder[2]}% ${cartBorder[3]}% ${100-cartBorder[3]}% ${100-cartBorder[2]}%` : '50%'}}>
                                {cartQty > 50 ? (
                                    
                                    <div id="burgerSmileyCart">
                                        <h2>:)</h2>
                                    </div>
                                    
                                ) : cartItems && cartItems.length > 0 ? (
                                    <h2>{cartQty}</h2>
                                    )
                                    :
                                    <div id="burgerNoItemsCart">   
                                    </div>
                                    }
                                
                            </div>
                        </Link>
                    </div>
                </div>
                
            </div>
            <Image 
                src='/images/SplashPage/Spatula.png' 
                alt="Spatula" 
                id="burgerSpatula" 
                width='100' 
                height='475' 
                style={{right:burgerToggle ? '-24rem':'-35rem'}}
            />
        </header>
    )
}