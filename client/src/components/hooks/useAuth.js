import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token')); // Cargar token del localStorage
    const [isAuth, setIsAuth] = useState(!!token); // Inicializar isAuth basado en si hay un token

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        setIsAuth(true);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Eliminar el token
        localStorage.removeItem('user');  // Eliminar el usuario
        setIsAuth(false); // Actualiza el estado de autenticación
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    const isTokenValid = (token) => {
        try {
            const tokenBase64 = token.split('.')[1];
            const decodedToken = JSON.parse(atob(tokenBase64));
            const exp = decodedToken.exp;

            return Date.now() < exp * 1000; // Devuelve verdadero si el token no ha expirado
        } catch (error) {
            console.error('error decoding token:', error);
            return false;
        }
    };

    return {
        token,
        isAuth,
        login,
        logout,
        isTokenValid,
    };
};

export default useAuth;
