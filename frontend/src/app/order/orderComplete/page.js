"use client"

import { selectOrderNumber, selectOrders } from "@/store/orderSlice"
import { useSelector } from "react-redux";
import OrderItem from "@/app/components/OrderItem";
import { selectUser } from "@/store/userSlice";
import Image from "next/image";
import Error from "@/app/components/Error";

export default function OrderPage () {


    const orderNumber = useSelector(selectOrderNumber);
    const orders = useSelector(selectOrders);
    const order = orders.find((order)=> order.orderId === orderNumber);
    const user = useSelector(selectUser);

    let formattedDate = null;
    if (order) {
        const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(order.dateCreated);
        formattedDate = Intl.DateTimeFormat('en-GB', dateOptions).format(date);
    }
    
        return(
            <div className="page">
                {!user ? 
                <Error location="NoLogin"/>
                :
                !order ? 
                    <Error location="Home"/>
                
                :
                <div id="orderCompletePage" className="orders">
                    <div className="individualOrder">
                        <h2>Breakfast Time Receipt</h2>
                        <div className="individualOrderDetails">
                            <p><strong>Order Date:</strong><br/>{formattedDate}</p>
                            <p><strong>Order No:</strong> <br/>{order.orderId}</p>
                        </div>
                        {order.orderItems ?
                            order.orderItems.map(orderItem=>(
                                <OrderItem productId={orderItem.product_id} quantity={orderItem.quantity} key={orderItem.product_id}/>
                        ))
                        :
                        null    
                        }
                    </div>
                    <div id="orderCompleteServerContainer">
                        <div id="orderServerSpeech">
                            <p>Thanks so much for your order</p>
                            <h3>{user.name}</h3>
                            <p>We hope to see you again soon!</p>
                        </div>
                        <Image
                            src='/images/CharacterImages/register.png'
                            width={884}
                            height={1430}
                            alt='Restaurant Server'
                            id="orderReceiptServer"
                        />
                    </div>
                </div>
            
                }
            </div>
        )
    }