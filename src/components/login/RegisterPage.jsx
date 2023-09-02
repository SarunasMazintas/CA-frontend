import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [errorMsg, setErrorMsg] = useState();
    const nav = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordRef2 = useRef();

    function redirectToLogin(seconds) {
        const timer = setTimeout(() => {
            nav('/');
            console.log('Automatically redirected to login page after registration')
        }, seconds * 1000);
        return () => clearTimeout(timer);
    }

    function submit() {
        if (passwordRef.current.value !== passwordRef2.current.value) {
            setErrorMsg('Passwords doesnt match. User will not be registered');
            return;
        }
        setErrorMsg();

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

        fetch('http://localhost:8001/register', options)
            .then(res => res.json())
            .then(data => {
                setErrorMsg(data.message);
                if (data.user){
                    redirectToLogin(3)
                }
            })
    }

    return (
        <div className='register-page'>
            <div className="form-control">
                <label htmlFor="username"> Username: </label>
                <input type="text" id='username' ref={usernameRef} />
            </div>

            <div className="form-control">
                <label htmlFor="password"> Password: </label>
                <input type="text" id='password' ref={passwordRef} />
            </div>

            <div className="form-control">
                <label htmlFor="password2"> Repeat password: </label>
                <input type="text" id='password2' ref={passwordRef2} />
            </div>

            {errorMsg && <div className="error-message">Klaida: {errorMsg}</div>}
            <button onClick={submit}>Register!</button>
            <div className='no-account-message'>
                <span>Already registered? </span>
                <Link to='/'>Login here!</Link>
            </div>
        </div>
    )
}