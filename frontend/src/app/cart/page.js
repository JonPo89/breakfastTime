"use client"

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { selectUser } from "@/store/userSlice";
import CartProduct from "../components/CartProduct";
import { selectCart, clearCart } from "@/store/cartSlice";
import Link from "next/link";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { selectProducts } from "@/store/productSlice";
import { placeOrder } from "@/store/orderSlice";
import { loadOrders } from "@/store/orderSlice";

export default function Cart(){
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const products = useSelector(selectProducts);
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalCost, setCartTotalCost] = useState(0);
    const descriptors = ['Funky Fellow', 'Fashionable Diva', 'Person with the weird eyebrow', 'Why are they wearing that', 'Obvious Toupee', 'Two feet']
    const [descriptor] = useState(() => Math.floor(Math.random() * descriptors.length));
    const [ordered, setOrdered] = useState(false);
    const speechWrapperRef = useRef(null);
    const [speechDims, setSpeechDims] = useState({width: 0, height:0})

    useEffect(() => {
        let quantity = 0
        let price = 0;

        if (cart.length>0 && products.length>0){
            cart.forEach(element => {
                quantity = quantity + element.quantity;
                const product = products.find(product => product.product_id === element.product_id);
                price = price + (product.price * element.quantity);
            });
        }
        setCartTotalQty(quantity);
        setCartTotalCost(price);
       
    },[cart]); 


    useLayoutEffect(() => {
        if (speechWrapperRef.current && cart.length>0 && user.name){
          setSpeechDims({height:speechWrapperRef.current.offsetHeight, width:speechWrapperRef.current.offsetWidth});
        }
    },[user, cart])

    const submitOrder = () => {
        dispatch(placeOrder());
        dispatch(clearCart());
        dispatch(loadOrders());
        setOrdered(true);        
    }

    return (
        <div className="page">
            <div id="cartPage">
                <div id="cartReceiptContainer">
                    <h1>{user.name ? user.name : descriptors[descriptor]}'s Order</h1>
                    
                    { cart.length > 0 ? 
                    <>
                        
                        <div id="cartItems">
                            {cart.map (cartItem => (
                            <CartProduct cartItem={cartItem}/>
                            ))}
                        </div>
                    </>
                    :
                        null
                        
                    }
                    <div className="hiddenFlexItem">
                    </div>
                </div>
                <div id="cartServerContainer">
                    <div id="cartServerSpeechWrapper" ref={speechWrapperRef} style={{minHeight: speechDims.height, minWidth: speechDims.width}}>
                        <div id="cartServerSpeech">
                            {!ordered ? 
                            <>
                                <p>Hey{user.name? ` ${user.name}` : ''}{cart.length>0? ", so that's" : ''}</p>
                                {cart && cart.length > 0 ?
                                    <>
                                        <div id="cartTotal">
                                            <h4>Item Total: <br/>{cartTotalQty}</h4>
                                            <h4>Price Total: <br/>${cartTotalCost.toFixed(2)}</h4>
                                        </div>
                                        {user.name ? 
                                            <>
                                                <p>Can I process your order?</p>
                                                <button onClick={submitOrder}>Checkout</button>
                                            </>
                                            :
                                            <>
                                                <p>I just need your name before I can process your order.</p>
                                                <Link href='/user' className="cartLink">Login</Link>
                                            </>
                                        }
                                    </>
                                :
                                    <>
                                        <p>Still looking? Here's the</p><Link href='/shop' className="cartLink">Menu</Link>
                                    </>
                                }
                            </>
                            :
                            <>
                                <p>Thanks for your order!</p>
                                <p>Your receipt can be viewed</p>
                                <Link href='order/orderComplete' className="cartLink">Here</Link>
                            </>
                            }
                            
                        </div>
                        <Image
                            src={`/images/CharacterImages/register${ordered?'02' : '01'}.png`}
                            width={884}
                            height={1430}
                            alt='Restaurant Server'
                            id="cartServer"
                        />
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}