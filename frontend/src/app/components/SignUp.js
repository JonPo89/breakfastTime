import { useDispatch } from "react-redux";
import { useRef } from "react";
import { createUser } from "@/store/userSlice";

export default function SignUp () {
    const dispatch = useDispatch();

    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const signUpSubmit = (name, username, password, email) => {
        if (!isValidEmail(email)){
            alert("Please include a valid email")
            return
        }
        dispatch(createUser({name, username, password, email}));
    }

    return (
        <div id="createUser" className="userInput">
            <div>
                <h4>NAME:</h4>
                <input 
                    type="text" 
                    ref={nameRef} 
                    placeholder="Name" 
                    onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            loginSubmit(
                                nameRef.current.value,
                                usernameRef.current.value,
                                passwordRef.current.value,
                                emailRef.current.value
                            );
                            }
                        }}
                    required />
            </div>
            <div>
                <h4>USERNAME:</h4>
                <input 
                    type="text" 
                    ref={usernameRef} 
                    placeholder="Username" 
                    onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            loginSubmit(
                                nameRef.current.value,
                                usernameRef.current.value,
                                passwordRef.current.value,
                                emailRef.current.value
                            );
                            }
                        }}
                    required/>
            </div>
            <div>
                <h4>PASSWORD:</h4>
                <input 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Password" 
                    onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            loginSubmit(
                                nameRef.current.value,
                                usernameRef.current.value,
                                passwordRef.current.value,
                                emailRef.current.value
                            );
                            }
                        }}
                    required/>
            </div>
            <div>
                <h4>EMAIL:</h4>
                <input 
                    type="email" 
                    ref={emailRef} 
                    placeholder="Email" 
                    onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            signUpSubmit(
                                nameRef.current.value,
                                usernameRef.current.value,
                                passwordRef.current.value,
                                emailRef.current.value
                            );
                            }
                        }}
                    required
                />
            </div>
            <button onClick={() => signUpSubmit(
                nameRef.current.value,
                usernameRef.current.value,
                passwordRef.current.value,
                emailRef.current.value
            )}>
                Submit
            </button>

        </div>
    )
}