import React, {useState, useEffect} from "react";
import './productPage.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveProduct } from "../products/productSlice";
import { addProductToCart } from "../cart/cartSlice";

export function ProductPage() {
    const [activeImage, setActiveImage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let productDetails = useSelector(selectActiveProduct)
    
    const addProductToCartSubmit = () => {
        dispatch(addProductToCart(productDetails.product_id))
    }


    useEffect(() => {
        if (!productDetails || !productDetails.product_id ) {
            navigate(`/products`);
        }
    }, [productDetails, navigate]);

    return (
        <div className="container" id="productPage">
            {productDetails?.images?.[activeImage] && (
            <>
                <div id="productImages">
                    <div className="imageGallery">
                        {productDetails.images.map((image, index) => (
                            <img src={`${process.env.PUBLIC_URL}/images/products${image.url}/${image.name}`} alt={image.name} onClick={() => setActiveImage(index)}/>
                        ))}
                    </div>
                    <a href={`${process.env.PUBLIC_URL}/images/products${productDetails.images[activeImage].url}/${productDetails.images[activeImage].name}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/products${productDetails.images[activeImage].url}/${productDetails.images[activeImage].name}`} 
                            key={`${productDetails.name} + hero`} 
                            id="primaryProductImage"   
                            alt={productDetails.name}
                        />
                    </a>
                
                    
                </div>
                <div id="productLeft">
                    <div id="productDetails">
                        <h2>{productDetails.name}</h2>
                        <p>{productDetails.product_type} > {productDetails.card_category} </p>
                        <br/>
                        <h3>${productDetails.price}</h3>
                        <br />
                        <p>{productDetails.description}</p>
                    </div>
                    <button onClick={()=>addProductToCartSubmit(productDetails.product_id)} className="addToCart">Add To Cart</button>
                </div>
            </>
            )}
        </div>
    )
}