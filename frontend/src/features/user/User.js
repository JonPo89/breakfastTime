import React from "react";
import './user.css';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, signout, selectIsLoggedIn } from "./userSlice";
import { clearCart } from '../cart/cartSlice';
import { useNavigate } from "react-router-dom";

export function User () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector(selectUser);
    let isLoggedIn = useSelector(selectIsLoggedIn)

    const signoutSubmit = () => {
        dispatch(signout());
        dispatch(clearCart());
    }

    const previousOrderSubmit = () => {
        navigate('/user/orders');
    }

    if (isLoggedIn) {
        return (
            <div id="user" className="container">
                <h1>Hello {user.name}</h1>
                <button className="yellowButton" onClick={previousOrderSubmit}>Previous Orders</button>
                <button onClick={signoutSubmit}>Logout</button>
            </div>    
        )
    }
    return (
        <div id="user" className="container">
            <h1>User</h1>
            <button onClick={() => navigate('/user/login')}>Login</button>
            <button className="yellowButton" onClick={() => navigate("/user/createUser")}>Create User</button>
            <p>A test user has been created if you don't want to create one.</p>
            <p>Otherwise you don't need an actual email</p>

        </div>
        
        
    )
}