import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const RegisterPage = () => {
    const backendUrl = useContext(MyBackendContext);
    const [message, setMessage] = useState([]);
    const nav = useNavigate();

    const usernameRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordRef2 = useRef();

    function redirectToLogin(seconds) {
        const timer = setTimeout(() => {
            nav('/');
            console.log('Automatically redirected to login page after registration')
        }, seconds * 1000);
        return () => clearTimeout(timer);
    }

    function isFormValid() {
        let noErrors = true;
        setMessage((e) => []);
        usernameRef.current.style.borderColor = null;
        usernameRef.current.style.backgroundColor = null;

        passwordRef.current.style.borderColor = null;
        passwordRef.current.style.backgroundColor = null;

        passwordRef2.current.style.borderColor = null;
        passwordRef2.current.style.backgroundColor = null;

        nameRef.current.style.borderColor = null;
        nameRef.current.style.backgroundColor = null;

        if (usernameRef.current.value.length < 4 || usernameRef.current.value.length > 20) {
            setMessage((currentValue) => [...currentValue, 'User name length must be 4..20!'])
            usernameRef.current.style.borderColor = "red";
            usernameRef.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            noErrors = false;
        }

        if (nameRef.current.value.length < 1 || nameRef.current.value.length > 50) {
            setMessage((currentValue) => [...currentValue, 'Name can not be empty and can not exceed the limit of 50 letters'])
            nameRef.current.style.borderColor = "red";
            nameRef.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            noErrors = false;
        }

        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 20 ) {
            setMessage((currentValue) => [...currentValue, 'Password length must be in range of 4..20'])
            passwordRef.current.style.borderColor = "red";
            passwordRef.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            noErrors = false;
        }

        if (passwordRef.current.value !== passwordRef2.current.value) {
            setMessage((currentValue) => [...currentValue, 'Passwords does not match']);
            passwordRef2.current.style.borderColor = "red";
            passwordRef2.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            return;
        }
        return noErrors;
    }


    function submit() {
        if (!isFormValid()) return;

        const user = {
            username: usernameRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch(backendUrl + '/register', options)
            .then(res => res.json())
            .then(data => {
                if (data.message) setMessage((currentValue) => [...currentValue, data.message]);
                if (data.error) setMessage((currentValue) => [...currentValue, 'Error: ' + data.error]);
                if (data.user) {
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
                <label htmlFor="name"> Name: </label>
                <input type="text" id='name' ref={nameRef} />
            </div>

            <div className="form-control">
                <label htmlFor="password"> Password: </label>
                <input type="password" id='password' ref={passwordRef} />
            </div>

            <div className="form-control">
                <label htmlFor="password2"> Repeat password: </label>
                <input type="password" id='password2' ref={passwordRef2} />
            </div>

            {message && <div className="error-message">{message.map((x, id) => <div key={id}>{x}</div>)}</div>}
            <button onClick={submit}>Register!</button>
            <div className='no-account-message'>
                <span>Already registered? </span>
                <Link to='/'>Login here!</Link>
            </div>
        </div>
    )
}