import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Login from '../../components/login/login';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login_user, login_user_google } from '../../redux/action'; 
import { useNavigate } from 'react-router-dom';




function LoginPage () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userOk, error }  = useSelector(state => ({
        userOk: state.user,
        error: state.error
    }))
    const [user, setUser] = useState({
        name: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: "Required",
        password: "Required"
    });

    const validate =(state, name) => {
        switch(name){
            case "name":
                if(state.name === "") {
                    setErrors({...errors, name:"Required"})
                } else {
                    if(state.name.length < 3) {
                        setErrors({...errors, name: "Must have at least 3 caracters"})
                    } else {
                        if(state.name.length > 12) {
                            setErrors({...errors, name: "Must have less than 12 caracters"})
                        } else {
                            setErrors({...errors, name:""})
                        }
                    }
                }
                break;

            case "password":
                if(state.password === "") {
                    setErrors({...errors, password:"Required"})
                } else {
                    if(state.password.length < 3)  {
                            setErrors({...errors, password:"Must have more than 3 caracters"})
                    } else {
                        setErrors({...errors, password:""});
                    }
                }
                break;
                default:
                    break;
        }
    }

    const disableFunction = () => {
        for(const key in user) {
            if(user[key] === "") {
                return true
            }
        }

        for(const error in errors) {
            if(errors[error] !== ""){
                return true;
            }
        }

        return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login_user(user))
        console.log("User logged succesfully", user.name);
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
        validate({...user, [name]: value}, name)
    }    

    if(userOk) {
        navigate('/home');
    }
return (

    <GoogleOAuthProvider clientId="274288050393-fnt12s3pdl4tnjpd7oioqsvhdvmq5pmp.apps.googleusercontent.com">

        <h1>login</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user"><p>User:</p></label>
                <input 
                    type="text"
                    name='name'
                    id='user'
                    value={user.name}
                    onChange={handleChange}
                    />

                {errors.name && <p>{errors.name}</p>}

                    <br /><br />

                <label htmlFor="password"><p>Contraseña:</p></label>
                <input 
                type="password"
                name="password"
                id='password'
                value={user.password}
                onChange={handleChange}
                 />

                 {errors.password && <p>{errors.password}</p>}

                 <br /><br />

                <button disabled={disableFunction()} type="submit">Log in</button>
                <Link to='/register' >
                    <button >Sign up</button>
                </Link>

            </form>
        </div>
        <Login/>

    </GoogleOAuthProvider>

)
}

export default LoginPage