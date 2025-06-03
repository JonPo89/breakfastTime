"use client"

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/cartSlice';
import Link from 'next/link';
import { useToast } from './ToastProvider';
import AddedToCart from './AddedToCart';

export default function ShopProduct({product}){
    const [quickAddScale, setQuickAddScale] = useState(0);
    const dispatch = useDispatch();
    const { show } = useToast();

    const [r1, r2, r3, r4] = useMemo(() => {
        return [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50) + 25
        ];
    }, []);

    const onClickSubmit = (productId) => {
        dispatch(addProductToCart(productId));
        setQuickAddScale(0.8);
        setTimeout(() => {
            setQuickAddScale(1.3);
        }, 300);
        show(
             <AddedToCart product={product}/>
          );
    }

    const onMouseOver = () => {
        if (quickAddScale === 0){
            setQuickAddScale(1);
        }
    }
    
    
    return(
        <div className="shopProductBox" onMouseOver={()=>onMouseOver()} onMouseLeave={()=>setQuickAddScale(0)}>
            <div className="quickAdd" style={{display: 'block', transform: `scale(${quickAddScale})`}} onClick={()=>onClickSubmit(product.product_id)} onMouseOver={()=>setQuickAddScale(1.3)} onMouseLeave={()=>setQuickAddScale(1)}>
                <h2>+</h2>
            </div>
            <Link href={`/product/${product.product_id}`}>
                <Image src={`/images/products${product.image_url}/${product.image_name}`} className="shopProductImage" width={150} height={150} alt={`${product.name}`} style={{borderRadius: `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`}}/>
                <p><strong>{product.name}</strong></p>
                <p className="shopPrice">${product.price}</p>
            </Link>
        </div>
    )    
}