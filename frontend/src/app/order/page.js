"use client"

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState, useEffect } from "react";
import { selectOrders, loadOrders, selectOrderErrorMessage } from "@/store/orderSlice";
import OrderItem from "../components/OrderItem";
import { selectUser } from "@/store/userSlice";
import Error from "../components/Error";


export default function Orders(){
    const orders = useSelector(selectOrders);
    const user = useSelector(selectUser);
    const [currentPage, setCurrentpage] = useState(0);
    const ordersPerPage = 5;
    const dispatch = useDispatch();

    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const startIndex = currentPage * ordersPerPage;
    const finishIndex = startIndex + ordersPerPage;
    const currentOrders = orders.slice(startIndex, finishIndex);

    const nextPage = () => {
        if (finishIndex < orders.length){
            setCurrentpage(prev => prev+1);
        }
    };

    const previouspage = () => {
        if (currentPage > 0){
            setCurrentpage(prev => prev -1);
        }
    }

    useEffect(() => {
        dispatch(loadOrders())
    },[])

    return (
        <div className="page">
            {!user.user_id ? 
                <Error location="NoLogin"/>
            : !selectOrderErrorMessage ? 
                <Error location="User"/>
            : 
            
            <div id="ordersPage" className="orders">
                <h1>{user.name}'s Orders</h1>
                <div id="orderPageNav" style={{justifyContent:startIndex === 0 ? 'end' : 'space-between'}}>
                    <p className="orderPageNavButton" onClick={previouspage} style={{display:currentPage===0 ? 'none' : 'block'}}>Previous</p>
                    <p className="orderPageNavButton" onClick={nextPage} style={{display:finishIndex >= orders.length  ? 'none' : 'block'}}>Next</p>
                </div>
                {!orders || orders.length === 0 ?  
                <>
                    <p>You don't appear to have any orders at this time.</p>
                    <Link href="/shop" style={{fontWeight: 'bold', textDecoration: 'underline', color:'blue'}}>Return to shop</Link>
                </>
                : 
                currentOrders.map(order=> {
                    const date = new Date(order.dateCreated);
                    const formattedDate = Intl.DateTimeFormat('en-GB', dateOptions).format(date);
                    return (                    
                    <div className="individualOrder" key={order.orderId}>
                        <h2>Breakfast Time Receipt</h2>
                        <div className="individualOrderDetails">
                            <p><strong>Order Date:</strong> {formattedDate}</p>
                            <p><strong>Order Number:</strong> {order.orderId}</p>
                        </div>
                        {order.orderItems ?
                            order.orderItems.map(orderItem=>(
                                <OrderItem productId={orderItem.product_id} quantity={orderItem.quantity}/>
                        ))
                        :
                        null    
                        }
                    </div>
                    )
                })}
            
            </div>
        }
        </div>
    )
    if (!orders){
        
    }
}