import React, {useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createUser, selectIsLoggedIn } from '../user/userSlice';

export function CreateUser () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    
    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/user`);
        }
    }, [isLoggedIn, navigate])

    const signUpSubmit = (name, username, password, email) => {
        dispatch(createUser({name, username, password, email}));
    }

    return (
        <div id="createUser" className="container">
            <h1>Create a user</h1>
            <div>
                <p>Name:</p>
                <input type="text" ref={nameRef} placeholder="Name" required />
            </div>
            <div>
                <p>Username:</p>
                <input type="text" ref={usernameRef} placeholder="Username" required/>
            </div>
            <div>
                <p>Password:</p>
                <input type="text" ref={passwordRef} placeholder="Password" required/>
            </div>
            <div>
                <p>Email:</p>
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