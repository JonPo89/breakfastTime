import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectOrderNumber } from "./orderSlice";
import { selectUser } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

export function OrderComplete(){
    const orderNumber = useSelector(selectOrderNumber);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const keepBrowsingClick = () => {
        navigate('/products');
    }

    useEffect(() => {
        if (orderNumber < 1) {
            navigate('/products');
        }
    })
    
    return (
        <div id="cart" className="container">
            <h1>Order Complete</h1>
            <p>Thank you for your order <strong>{user.name}.</strong></p>
            <p>Order Number: <strong>{orderNumber}</strong></p>
            <button onClick={keepBrowsingClick}>Keep Browsing</button>
        </div>
    )
}