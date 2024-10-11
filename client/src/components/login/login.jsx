import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const token = tokenResponse.access_token;
                const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });

                const {sub: userId, name} = response.data;

                const firstName = name.split(' ')[0];

                const userData = {
                    token,
                    userId,
                    name: firstName
                }

                localStorage.setItem('user', JSON.stringify(userData))

                console.log('usuario guardado login google'  , userData);

                navigate('/home');
                
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },

        onError: errorResponse => {
            console.error('Error during login:', errorResponse);
        }
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