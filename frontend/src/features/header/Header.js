import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './header.css';
import { NavLink, Link } from "react-router-dom";
import { selectCart} from '../cart/cartSlice';
import { selectIsLoggedIn } from '../user/userSlice';
import { IoCart, IoPerson  } from "react-icons/io5";


export function Header() {
    const [qtyCartItems, setQtyCartItems] = useState(0);
    const cartList = useSelector(selectCart);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (cartList && cartList.length > 0) {
            const sumOfQty = cartList.reduce((sum, item) => {
                return sum + item.quantity;
            },0)
            setQtyCartItems(sumOfQty);
        } else {
            setQtyCartItems(0);
        };
        
    }, [cartList]);

    

    return(
        <>
            <div id="header" >
                <div id="headerTop">
                    <img id="headerLogo" src={`${process.env.PUBLIC_URL}/images/breakfasttime logo.png`} alt="Breakfast Time Logo" />
                </div>
                <div id="headerBottom">
                    <div className="headerEdge"></div>
                    <div id="nav">
                        <NavLink to="/" className={({isActive}) => isActive ? 'activeNavLink' : "navLink"}>Home</NavLink>
                        <NavLink to="/about" className={({isActive}) => isActive ? 'activeNavLink' : "navLink"} >About</NavLink>
                        <NavLink to="/products" className={({isActive}) => isActive ? 'activeNavLink' : "navLink"}>Products</NavLink>
                    </div>
                    <div id="userCart" className="headerEdge">
                        <Link to="/user" >
                            <IoPerson id="userIcon" style={{color: isLoggedIn ? 'white' : 'transparent'}}/>
                        </Link>
                        <Link to="/cart" >
                            <div id="cartItemWrapper">
                                <h3 id="qtyCartItems" style={{color: qtyCartItems > 0 ? 'var(--lightRed)' : 'white'}}>{qtyCartItems}</h3>
                                <IoCart id="cartIcon" style={{color: qtyCartItems > 0 ? 'white' : 'transparent'}}/>
                            </div>
                        </Link>
                        
                    </div>
                </div>
                
                
            </div>
        </>
    )
}