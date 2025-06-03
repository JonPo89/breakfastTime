"use Client"
import { useSelector } from "react-redux"
import { selectProducts } from "@/store/productSlice"
import Image from "next/image"

export default function OrderItem({productId, quantity}){
    const products = useSelector(selectProducts);
    const product = products.find(product=> product.product_id === productId)

    if (!product) return null;
    
    return(
        <div className="orderItem">
            <div className="orderItemImage">
                <Image
                    key={product.name}
                    src={`/images/products${product.image_url}/${product.image_name}`}
                    width={500}
                    height={500}
                    alt={product.name}
                    className="orderImage"
                />
            </div>
            <div className="orderItemInfo">
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
            </div>
        </div>
    )
}