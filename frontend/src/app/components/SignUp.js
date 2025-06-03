import { useDispatch } from "react-redux";
import { useRef } from "react";
import { createUser } from "@/store/userSlice";

export default function SignUp () {
    const dispatch = useDispatch();

    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const signUpSubmit = (name, username, password, email) => {
        dispatch(createUser({name, username, password, email}));
    }

    return (
        <div id="createUser" className="userInput">
            <div>
                <h4>NAME:</h4>
                <input type="text" ref={nameRef} placeholder="Name" required />
            </div>
            <div>
                <h4>USERNAME:</h4>
                <input type="text" ref={usernameRef} placeholder="Username" required/>
            </div>
            <div>
                <h4>PASSWORD:</h4>
                <input type="text" ref={passwordRef} placeholder="Password" required/>
            </div>
            <div>
                <h4>EMAIL:</h4>
                <input type="text" ref={emailRef} placeholder="Email" required/>
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