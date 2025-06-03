"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { selectIsLoggedIn, selectUser,signout, selectServerError } from "@/store/userSlice"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import { clearCart } from "@/store/cartSlice"
import Error from "../components/Error"
import { loadOrders, clearOrders } from "@/store/orderSlice"

export default function User (){
    const dispatch = useDispatch();
    const [isSigningUp, setIsSigningUp] = useState(false);
    const serverError = useSelector(selectServerError)
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    let userDetails = useSelector(selectUser);

    const submitSignout = () => {
        dispatch(signout());
        dispatch(clearCart());
        dispatch(clearOrders());
    }

    useEffect(() => {
        if (isLoggedIn){  
            dispatch(loadOrders());
        }
    },[isLoggedIn])
    
    if (serverError) return <Error location="Server"/>

    return (
        <div className="page" id="userPage">
            {isLoggedIn ?
            <div id="loggedIn" className="userPageContent">
                <div id="userGreeting">
                    <h2>Welcome</h2>
                    <h1>{userDetails.name}</h1>
                    <h2>Ready for Breakfast?</h2>
                </div>
                <div className="userContent" id="loggedInUser">
                    <div className='yolkButton'>
                        <Link href="/order">
                            <button>Orders</button>
                        </Link>
                    </div>
                    <div className='yolkButton'>
                        <button onClick={() => submitSignout()}>Logout</button>
                    </div>
                </div>
                
            </div> 
            :
            <div id="signedOut" className="userPageContent" >
                <p>{isSigningUp? 'Coming back for more?' : 'Not yet a customer?'}</p>
                <div className="userContent" >
                    <h1 style={{fontSize: isSigningUp? '1rem' : '3rem', color: isSigningUp? 'black' : '', top: isSigningUp? '-4.5rem' : '0rem', textDecoration: !isSigningUp? 'none' : 'underline', cursor: isSigningUp ? 'pointer' : 'default'}} onClick={() => setIsSigningUp(false)}>LOGIN</h1>
                
                    <h1 style={{fontSize: isSigningUp? '3rem' : '1rem', color: isSigningUp? '' : 'black', top: isSigningUp? '-1rem' : '-8rem', textDecoration: isSigningUp? 'none' : 'underline', cursor: !isSigningUp ? 'pointer' : 'default'}} onClick={() => setIsSigningUp(true)}>SIGN UP</h1>
                    {isSigningUp ? 
                        <SignUp/>
                        :
                        <Login/>
                    }
                </div>
            </div>
            }    
        </div>
    )
}