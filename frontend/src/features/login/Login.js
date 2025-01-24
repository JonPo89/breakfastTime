import React, {useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectIsLoggedIn } from '../user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Login () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/user`);
        }
    }, [isLoggedIn, navigate])

    const loginSubmit = async (username, password) => {
        if (username.length === 0 || password.length === 0) {
            alert('Please fill in fields');
        } else {
            dispatch(loginUser({username, password}));
        }
        
    }  

    return (
        <div id="login" className="container">
            <h1>Login</h1>
            <p>You can use a Test User Account if you don't want to create one.</p>
            <p>Username: <strong>testuser</strong></p>
            <p>Password: <strong>password</strong></p>
            <br />
            <p>Username:</p>
            <input type="text" placeholder="Username" ref={usernameRef} />
            <p>Password:</p>
            <input type="password" placeholder="Password" ref={passwordRef} />
            <br/>
            <button onClick={() => loginSubmit(
                usernameRef.current.value,
                passwordRef.current.value
            )}>Login</button>
        </div>
    )
}