import React from "react";
import './orders.css';
import {selectOrders} from './orderSlice'
import { selectProducts } from "../products/productSlice";
import { useSelector } from "react-redux";

export function Orders () {
    let prevOrders = useSelector(selectOrders);
    let productList = useSelector(selectProducts);
    
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };


    return (
        <div id="orders" className="container">
            <h1>Previous Orders</h1>
            {prevOrders ? 
            <>
            {prevOrders.map(prevOrder => {
                const date = new Date(prevOrder.dateCreated);
                const formattedDate = Intl.DateTimeFormat('en-GB', dateOptions).format(date);
                return (
                    <div className="previousOrder">
                        <div className="prevOrderTop">
                            
                            <p>Order Number: <strong>{prevOrder.orderId}</strong></p>
                            <p>Order Date: <strong>{formattedDate}</strong></p>
                            
                        </div>
                        {prevOrder.orderItems.map(orderItem => {

                            const productId = orderItem.product_id;
                            const product = productList.find(product => productId === product.product_id);

                            return(
                                <div className="prevOrderBottom">
                                    <img className="orderItemImage" src={`${process.env.PUBLIC_URL}/images/products${product.image_url}/${product.image_name}`} alt={`${product.name}`} />
                                    <div className="prevOrderDetails">
                                        <p>Product: <strong>{product.name}</strong></p>
                                        <p>Quantity: <strong>{orderItem.quantity}</strong></p>
                                    </div>
                                </div>
                            )
                            }

                            )}
                    </div>
                )
            })}
            </>
            : <h2> No previous orders</h2>
        }
        </div>
    )
}