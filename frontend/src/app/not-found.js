import Link from "next/link"

export default function NotFound(){
    return(
        <div className="page" style={{paddingTop: '3rem'}}>
            <h1>404 - Page not found</h1>
            <p style={{marginTop: '3rem'}}>Wooopsie! The page you're looking for doesn't exist!</p>
            <Link href="/" className="link" style={{color:'blue', fontWeight:'bold', textDecoration:'underline'}}>Return Home</Link>
        </div>
    )
}