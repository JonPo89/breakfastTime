"use client"

import { useSelector } from 'react-redux';
import { selectProducts, selectProductErrorMessage } from '@/store/productSlice';
import ShopProduct from '../components/ShopProduct';
import { selectServerError } from '@/store/userSlice';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Shop (){
    const productList = useSelector(selectProducts);
    const productHasError = useSelector(selectProductErrorMessage);
    const serverError = useSelector(selectServerError);

    if (serverError) return <Error location="Server"/>

    if (productHasError) return <Error location="Product"/>;
    
    if (!productList || productList.length === 0) return <Loading />;

    return (
        <div className="page" id="shopPage">
            <div id="shopProductList">
                {productList.map(product => (
                    <ShopProduct product={product} key={product.product_id} />
                    
                ))}
                <div className="hiddenFlexItem">

                </div>
                <div className="hiddenFlexItem">
                    
                </div>
                <div className="hiddenFlexItem">
                    
                </div>
                <div className="hiddenFlexItem">
                    
                </div>
            </div>

        </div>
    )
}