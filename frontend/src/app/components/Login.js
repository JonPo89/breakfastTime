import { loginUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { loadOrders } from "@/store/orderSlice";

export default function Login () {
    const dispatch = useDispatch();
    
    const usernameRef = useRef();
    const passwordRef = useRef();
    
    const loginSubmit = async (username, password) => {
        if (username.length === 0 || password.length === 0) {
            alert('Please fill in fields');
        } else {
            dispatch(loginUser({username, password}));
            dispatch(loadOrders());
        }
        
    }  
    
    return (
        <div id="login" className="userInput">
            <div>
                <p>You can use a Test User Account if you don't want to create one.<br/><br/></p>
                <p>Username: <strong>testuser</strong></p>
                <p>Password: <strong>password</strong></p>
                <br/>
                <h4>USERNAME:</h4>
                <input type="text" placeholder="Username" ref={usernameRef} />
                <h4>PASSWORD:</h4>
                <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <div>
            <button onClick={() => loginSubmit(
                usernameRef.current.value,
                passwordRef.current.value
            )}>Login</button>
            </div>
        </div>
    )
}