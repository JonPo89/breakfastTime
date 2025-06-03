
import Image from 'next/image';

export default function AddedToCart ({product}) {

    return (
        <div id="addedToCart" >
            <Image 
                src={`/images/products${product.image_url}/${product.image_name}`} 
                className="addedToCartImage" 
                width={150} 
                height={150} 
                alt={`${product.name}`}
            />
            <h3>Added to Cart!</h3>
        </div>
    )
}