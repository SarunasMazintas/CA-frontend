import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyBackendContext } from '../../App'
import { useContext } from 'react';

const localStorageExpirationMinutes = 1000*60*5;

function getDateInHumanForm(timestamp) {
    const date2 = new Date(Number(timestamp));
    const year = date2.getFullYear()
    const month = String(date2.getMonth()).length < 2 ? '0' + (date2.getMonth() + 1) : date2.getMonth();
    const day = String(date2.getDate()).length < 2 ? '0' + date2.getDate() : date2.getDate();
    const hour = String(date2.getHours())
    const minutes = String(date2.getMinutes())
    const seconds = String(date2.getSeconds())
    return '' + year + '-' + month + '-' + day + ', ' + hour + ':' + minutes + ':' + seconds
  }
  
export const LoginPage = ({ setLoggedUser }) => {
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

    function getStorageUser(){
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        
        if (!loggedUser?.id) return;
        if (!loggedUser.timestamp) return;
        
        const currentTimestamp = new Date().getTime();
        
        
        if (Number(loggedUser.timestamp) + localStorageExpirationMinutes < currentTimestamp){
            console.log(`User timestamp: ${getDateInHumanForm(Number(loggedUser.timestamp))}
            max allowed timestamp: ${getDateInHumanForm(Number(loggedUser.timestamp) + localStorageExpirationMinutes)}
            current timestamp: ${getDateInHumanForm(currentTimestamp)}
            `)
            localStorage.removeItem('loggedUser')
            return;
        } 

        return loggedUser;
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
                {getStorageUser() && <div>Continue as "{getStorageUser().username}"</div>}
            </div>
        </div>
    )
}

