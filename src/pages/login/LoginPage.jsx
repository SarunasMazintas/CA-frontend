import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyBackendContext } from '../../App'
import { useContext } from 'react';

export const LoginPage = ({ setLoggedUser, loginStorageUser, validateStorageUser }) => {
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

    async function loginRequest() {
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

        const res = await fetch(backendUrl + '/login', options)
        const data = await res.json();

        setMessage(data.message);
        console.log(data)

        if (!data.user) return;

        console.log(data.user._id)
        login(data.user, 1)
        buttonRef.current.disabled = true;

        const loggedUserShort = {
            username: data.user.username,
            id: data.user._id,
            timestamp: new Date().getTime().toString()
        }

        localStorage.setItem('loggedUser', JSON.stringify(loggedUserShort))
    }


    function loginFromLS(){
        console.log('abubibubu')
        loginStorageUser();
        nav('/animals');
    }

    return (
        <div>
            <div className="login-page">
                <div className="form-control">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id='username' defaultValue='sarunas' ref={usernameRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" defaultValue='sarunas' id='password' ref={passwordRef} />
                </div>
                <button onClick={loginRequest} ref={buttonRef}>Login</button>
                {message && <div>Message: {message}</div>}
                <div className='no-account-message'>
                    Don't have an account?
                    <Link to='/register'>Create one!</Link>
                </div>
                {validateStorageUser() && <div
                    style={{ cursor: 'pointer' }}
                    onClick={loginFromLS}
                    >Continue as "{validateStorageUser().username}"</div>}
            </div>
        </div>
    )
}

