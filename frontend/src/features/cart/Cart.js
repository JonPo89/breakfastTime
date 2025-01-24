import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeProductFromCart, clearItemFromCart, addProductToCart, clearCart} from "./cartSlice";
import { placeOrder, loadOrders } from '../orders/orderSlice';
import { selectIsLoggedIn } from '../user/userSlice';
import { selectProducts } from "../products/productSlice";
import { IoCart } from "react-icons/io5";
import './cart.css';

export function Cart () {
    const [qtyCartItems, setQtyCartItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loggedIn = useSelector(selectIsLoggedIn);

    let cartList = useSelector(selectCart);
    let productList = useSelector(selectProducts);
    
    useEffect(() => {
        if (cartList.length > 0) {
            const sumOfQty = cartList.reduce((sum, item) => {
                return sum + item.quantity;
            },0)
            setQtyCartItems(sumOfQty);
        } else {
            setQtyCartItems(0);
        };
        
    }, [cartList]);

    useEffect(() => {
        let sumOfPrice = 0;
        cartList.forEach(cartItem => {
            const {product_id, quantity} = cartItem;
            const product = productList.find(product => product.product_id === product_id);
            sumOfPrice += product.price * quantity;
        });
        setTotalPrice(sumOfPrice);
    }, [cartList, productList]);

    const keepBrowsingClick = () => {
        navigate('/products');
    }

    const clearProductFromCartSubmit = (productId) => {
        dispatch(clearItemFromCart(productId))
    }

    const removeProductFromCartSubmit = (productId) => {
        dispatch(removeProductFromCart(productId))
    }

    const addProductToCartSubmit = (productId) => {
        dispatch(addProductToCart(productId));
    }

    const placeOrderSubmit = () => {
        if (loggedIn) {
            dispatch(placeOrder());
            dispatch(clearCart());
            dispatch(loadOrders());
            navigate('/orderComplete');
        } else {
            alert('You must be logged in to place an order.');
            navigate('/user');
        }      
    }

    if (cartList.length === 0) {
        return (
            <div id="emptyCart" className="container">
                <IoCart id="emptyCartIcon"/>
                <h3>Your cart is empty.</h3>
                <p>Browse through our</p>
                <p onClick={keepBrowsingClick}>Products</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Your Cart</h1>
            <div id="cartPage">
                <div id="cart">
                    {cartList.map(cartItem => {
                        const {product_id, quantity} = cartItem
                        const product = productList.find(product => product.product_id === product_id);
                        if (product && product.name){
                            return (
                                <div className="cartItem">
                                    <img className="cartImage" alt={`${product.name}`} src={`${process.env.PUBLIC_URL}/images/products${product.image_url}/${product.image_name}`} />
                                    <div className="cartItemDetails">
                                        <div className="cartItemLeftDetails">
                                            <p><strong>{product.name}</strong></p>
                                            <p>{product.product_type}</p>
                                            <p><strong>Unit Price:</strong> {'$' + product.price}</p>
                                        </div>
                                        <div className="cartItemRightDetails">
                                            <p id="removeButton" onClick={() => clearProductFromCartSubmit(product.product_id)}>Remove</p>
                                            <div className="cartQty">
                                                <div className="cartQtyControls">
                                                    <h3 className='addRemoveFromCart' onClick={(() => removeProductFromCartSubmit(product.product_id))}>-</h3>
                                                    <h5>{quantity}</h5>
                                                    <h3 className='addRemoveFromCart' onClick={() => addProductToCartSubmit(product.product_id)}>+</h3>
                                                </div>
                                            </div>
                                            <p><strong>Total Price:</strong> {'$' + product.price * quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    })}
                <p id='viewMore' onClick={() => navigate('/products')}>View more products</p>
                </div>
                <div id="orderSummary">
                        <h3>Order Summary:</h3>
                        <p>{qtyCartItems} item{qtyCartItems>1?'s' : ''}</p>
                        <p>Total: <strong>${totalPrice}</strong></p>

                    <button id="orderButton" onClick={placeOrderSubmit}>Order</button>
                </div>
            </div>
        </div>
    )
}