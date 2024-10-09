import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const handleSucess = (credentialResponse) => {
        console.log("Funciono el login", credentialResponse);

        navigate('/home');
        
    }

    const handleError = () => {
        console.log("Login Failed");
    }

    useGoogleOneTapLogin({
        onSuccess: handleSucess,
        onError: handleError 
        })

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });

    return (
        <div>
            <button onClick={() => login()} >
                <img style={{width: '20px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" />
            </button>
        </div>
    );
}

export default Login;