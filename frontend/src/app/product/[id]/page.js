"use client"

import { useEffect, useState, use, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { loadProductDetails, selectActiveProduct, selectProductErrorMessage } from "@/store/productSlice";
import { addProductToCart } from '@/store/cartSlice';
import { useToast } from '@/app/components/ToastProvider';
import AddedToCart from '@/app/components/AddedToCart';
import { ImZoomIn } from "react-icons/im";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import Loading from '@/app/components/Loading';
import Error from '@/app/components/Error';

export default function ProductPage({ params }) {
  const dispatch = useDispatch();
  const { id } = use(params);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(1);
  const {show} = useToast();
  const primaryInfoRef = useRef(null);
  const [ primMinDims, setPrimMinDims] = useState({height:0,width:0});
  const [imageMax, setImageMax] = useState(false);
  const [imageMouseOver, setImageMouseOver] = useState(false);

  const product = useSelector(selectActiveProduct);
  const productHasError = useSelector(selectProductErrorMessage);
  
  useEffect(() => {
    dispatch(loadProductDetails(id));
  }, [dispatch, id]);

  useLayoutEffect(() => {
    if (primaryInfoRef.current && product.description){
      setPrimMinDims({height:primaryInfoRef.current.offsetHeight, width:primaryInfoRef.current.offsetWidth});
    }
  },[product])

  const onSubmitAddToCart = () => {
    dispatch(addProductToCart(product.product_id));
    show (
      <AddedToCart product={product}/>
    )
    setAddedToCart(2);
    setTimeout(()=>{
      setAddedToCart(1);
    },2000) 
  }

  if (productHasError) return <Error location="Product"/>;

  if (!product || !product.images || !product.images[activeImage]) return <Loading />;

  return (
    <div className="page">
      
      <div id="productPage">
        
        <div id="fullScreenImage" style={{display: imageMax? 'flex' : 'none'}}>
          <div className="imageScrollArrowBox" id="leftBox" onClick={()=>setActiveImage(activeImage > 0 ?  activeImage - 1 : product.images.length-1)}>
            <FaArrowCircleLeft className="imageScrollArrow" />
          </div>
          <div id="fullScreenImageContainer">
            <IoCloseOutline id='fullScreenClose'/>
            <Image 
              src={`/images/products${product.image_url}/${product.images[activeImage].name}`} 
              alt={`${product.name} Main View`} 
              id="productFullScreenImage" 
              width={1500} 
              height={1500}
              onClick={() => setImageMax(!imageMax)}
            />
          </div>
          
          <div className="imageScrollArrowBox" id="rightBox" onClick={()=>setActiveImage(activeImage < product.images.length -1 ?  activeImage+ 1 : 0)}>
            <FaArrowCircleRight className="imageScrollArrow"/>
          </div>
        </div>
        
        <div id="productComponents">
          <div id="productImageContainer">
            <div id="primaryImageContainer" >
              <ImZoomIn id="imageZoom" style={{opacity: imageMouseOver ? 1 : 0}}/>  
              <Image 
                src={`/images/products${product.image_url}/${product.images[activeImage].name}`} 
                alt={`${product.name} Main View`} 
                id="productPrimaryImage" 
                width={500} 
                height={500}
                onMouseEnter={() => setImageMouseOver(true)}
                onMouseLeave={() => setImageMouseOver(false)}
                onClick={() => setImageMax(!imageMax)}
              />
            </div>
            <div id="productImages">
              {product.images && product.images.map((image, index) => (
                <div className="secondaryImageContainer" key={index}>
                  <Image
                    src={`/images/products${image.url}/${image.name}`}
                    width={500}
                    height={image.name.includes('image') ? 316 : 500}
                    alt={image.name}
                    className="productSecondaryImages"
                    onClick = {() => setActiveImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div id="productInfoContainer" className="productContainers">
            <div id="productHeader">
              <h1>{product.name}</h1>
              <h2>${product.price}</h2>
            </div>
            <div id="productInfoPrimaryWrapper" ref={primaryInfoRef} style={{minHeight: `${primMinDims.height}px`, minWidth: `${primMinDims.width}px`}}>
              <div id="productInfoPrimary">
                  {addedToCart === 1 ? 
                    <>
                      <p>Can I interest you in this item?</p>
                      <button id="addToCart" onClick={onSubmitAddToCart}>Add To Cart</button>
                      <p>{product.description}</p>
                    </>
                    :
                    <>
                      <p>Very good choice!</p>
                    </>
                  }
              </div>
            </div>
            <div id="productInfoSecondary">
                <Image 
                  alt='Server'
                  src={`/images/CharacterImages/Server0${addedToCart}.png`}
                  width={1020}
                  height={1299}
                  id="productServer"
                  />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}