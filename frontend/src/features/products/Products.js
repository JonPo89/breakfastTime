import React from "react";
import './products.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, loadProductDetails } from './productSlice';

export function Products () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector(selectProducts);

    const productPage = (product) => {
        dispatch(loadProductDetails(product.product_id));
        navigate(`/products/${product.name}`);
    }

    if (!productList ) {
        return <div>Loading...</div>
    } else {

    return (
        <div id="products" className="container">
            {productList.map(product => {
                return (
                    <div key={product.product_id} className="productListItem" onClick={()=>productPage(product)}>

                        <img src={`${process.env.PUBLIC_URL}/images/products${product.image_url}/${product.image_name}`} alt={product.name}/>
                        <div className="productListItemBottom">
                            <p><strong>{product.name}</strong></p>
                            <p>${product.price}</p>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}
}