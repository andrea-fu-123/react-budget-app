import { React, useEffect } from 'react';
import './Login.css';

const Login = () => {

    // on sign in 
    const handleCallbackResponse = (response) => {
        console.log("Token: " + response.credential)
        sessionStorage.setItem('token', response.credential); // store in session storage for other components
        console.log(sessionStorage.getItem('token'))
        window.location.href = '/budget'; // used to be /summary
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '225349891912-itlt19uasfapf30gdgd5k2ahtqq174j7.apps.googleusercontent.com',
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, [])
    return (
        <div className='login-container'>
            <div className='login'>
                <h2>Welcome to Budget Buddy</h2>
                <div id="signInDiv"></div>
            </div>
        </div>




    )
}

export default Login
