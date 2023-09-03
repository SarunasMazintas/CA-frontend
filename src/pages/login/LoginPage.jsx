import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyBackendContext } from '../../App'
import { useContext } from 'react';

export const LoginPage = ({setLoggedUser}) => {
    const backendUrl = useContext(MyBackendContext);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const buttonRef = useRef();

    const [message, setMessage] = useState();
    //const [user, setUser] = useState();
    const nav = useNavigate();

    function login(user, seconds) {
        setLoggedUser(user);
        const timer = setTimeout(() => {
            nav('/animals');
            console.log('Automatically redirected to main page after succesfull login');
            buttonRef.current.disabled = false;
        }, seconds * 1000);
        return () => clearTimeout(timer);

    }

    function loginRequest() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch(backendUrl + '/login', options)
            .then(res => res.json())
            .then(data => {
                setMessage(data.message);
                console.log(data)
                if (data.user) {
                    console.log(data.user._id)
                    login(data.user, 2)
                    buttonRef.current.disabled = true;
                }
            })
    }

    return (
        <div>
            <div className="login-page">
                <div className="form-control">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id='username' ref={usernameRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="password"> Password: </label>
                    <input type="text" id='password' ref={passwordRef} />
                </div>
                <button onClick={loginRequest} ref={buttonRef}>Login</button>
                {message && <div>Message: {message}</div>}
                <div className='no-account-message'>
                    Don't have an account?
                    <Link to='/register'>Create one!</Link>
                </div>
            </div>
        </div>
    )
}

