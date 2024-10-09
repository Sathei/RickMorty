import { useState, useEffect } from "react";

const useAuth = () => {
    const [token, setToken] = useState(null)
    const { isAuth, setIsAuth } = useState(false)

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken)
        setIsAuth(true)
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuth(false)
    }

 
    const isTokenValid = (token) => {
        try {
            const tokenBase64 = token.split('.')[1];
            const decodedToken = JSON.parse(atob(tokenBase64));

            const exp = decodedToken.exp

            if(Date.now() >= exp * 1000) {
                return false
            }

            return true;
        } catch (error) {
            console.error('error decoding token:', error);
            return false;
        }
    }

    return {
        token,
        isAuth,
        login,
        logout,
        isTokenValid
    };
}

export default useAuth;