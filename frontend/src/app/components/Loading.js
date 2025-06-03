import { useState, useEffect } from "react";
import { selectProductErrorMessage, selectProductsHasError, selectIsLoading } from "@/store/productSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Loading(){
    const [longLoading, setLongLoading] = useState(false);
    const hasError = useSelector(selectProductErrorMessage);
    const isLoading = useSelector(selectIsLoading);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLongLoading(true);
        }, 20000)

        return () => clearTimeout(timer);
        
    },[])
    
    return(
        <div className="page">
            <div id="loadingProducts">
                <div id="loadingEgg">
                    <div id="loadingYolk">
                    </div>
                </div>
                {isLoading ? 
                    <p>Loading...</p>
                    :
                    hasError ?
                        <Error location="Products"/>
                    :
                    null
                
                }
                    
                <p style={{visibility: longLoading && isLoading ? 'visible' : 'hidden'}}>Apologies, something seems to be wrong with the server.<br/>Please refresh the page and try again.</p>
            </div>
        </div>
    )
}