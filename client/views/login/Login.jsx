import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../../components/login/login';
import { Link } from 'react-router-dom';

function LoginPage () {
return (

    <GoogleOAuthProvider clientId="274288050393-fnt12s3pdl4tnjpd7oioqsvhdvmq5pmp.apps.googleusercontent.com">

        <h1>login</h1>
        <div>
            <form action="submit">
                <label htmlFor="user"><p>Usuario:</p></label>
                <input id='user' type="text" />
                <label htmlFor="pass"><p>Contraseña:</p></label>
                <input id='pass' type="password" />
                <button type="submit">Log in</button>
                <Link to='/register' >
                    <button>Sign up</button>
                </Link>

            </form>
        </div>
        <Login/>

    </GoogleOAuthProvider>

)
}

export default LoginPage