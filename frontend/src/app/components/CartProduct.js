import { useSelector } from "react-redux"
import { selectProducts } from "@/store/productSlice";
import Image from "next/image";
import { addProductToCart, clearItemFromCart, removeProductFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";


export default function CartProduct({cartItem}) {
    const products = useSelector(selectProducts);
    const {product_id, quantity} = cartItem;
    const dispatch = useDispatch();


    const product = products.find((prod) => prod.product_id === product_id);

    
    if (!product) return null;

    const totalCost = quantity * product.price;

    
    return (
        <div className="cartProduct">
            <div className="cartTop">
                <Image
                    key={product.name}
                    src={`/images/products${product.image_url}/${product.image_name}`}
                    width={500}
                    height={500}
                    alt={product.name}
                    className="cartProductImage"
                />
                <div className="cartProductInfo">
                    
                        <div className="cartProdDetails">
                            <h2>{product.name}</h2>                         
                        </div>  
                        <div className="cartQuantity">
                            <h2 className="qtyAdjust" alt="Decrease cart quantity" onClick={() => dispatch(removeProductFromCart(product.product_id))}>-</h2>
                            <h3 className="qtyAmount">{quantity}</h3>
                            <h2 className="qtyAdjust" alt="Increase cart quantity" onClick={() => dispatch(addProductToCart(product.product_id))}>+</h2>
                            <h2 id="removeItem" onClick={() => dispatch(clearItemFromCart(product.product_id))}>Remove</h2>
                        </div>
                </div>
            </div>
            <div className="cartPrice">
                <h3><strong>Unit Price:</strong> ${product.price}</h3>
                <h3><strong>Total Price:</strong> ${totalCost}.00</h3>
            </div>
            
        </div>
    )
}