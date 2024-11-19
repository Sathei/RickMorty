import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../../components/login/login';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login_user } from '../../redux/action'; 
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';
import './Login.css';

function LoginPage () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const googleId = import.meta.env.VITE_GOOGLE_CLIENT;
    
    const [user, setUser] = useState({
        name: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: "Required",
        password: "Required"
    });

    const [loaded, setLoaded] = useState(false); // Inicialmente en false

    useEffect(() => {
        // Simula un tiempo de carga
        const loadContent = async () => {
            // Simula una llamada a la API o cualquier otro proceso de carga
            await new Promise(resolve => setTimeout(resolve, 1000)); // Ajusta el tiempo según sea necesario
            setLoaded(true); // Cambia a true una vez que se haya completado la carga
        };

        loadContent();
    }, []);

    const validate = (state, name) => {
        switch(name) {
            case "name":
                if(state.name === "") {
                    setErrors({...errors, name:"Required"});
                } else {
                    if(state.name.length < 3) {
                        setErrors({...errors, name: "Must have at least 3 characters"});
                    } else if(state.name.length > 12) {
                        setErrors({...errors, name: "Must have less than 12 characters"});
                    } else {
                        setErrors({...errors, name:""});
                    }
                }
                break;

            case "password":
                if(state.password === "") {
                    setErrors({...errors, password:"Required"});
                } else {
                    if(state.password.length < 3) {
                        setErrors({...errors, password:"Must have more than 3 characters"});
                    } else {
                        setErrors({...errors, password:""});
                    }
                }
                break;
            default:
                break;
        }
    };

    const disableFunction = () => {
        for(const key in user) {
            if(user[key] === "") {
                return true;
            }
        }

        for(const error in errors) {
            if(errors[error] !== "") {
                return true;
            }
        }

        return false;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await dispatch(login_user(user)); 
        if (success) {
            alert("User logged successfully", user.name);
            navigate('/home'); 
        } else {
            alert('User does not exist or password is incorrect');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
        validate({...user, [name]: value}, name);
    };    

    return (
        <GoogleOAuthProvider clientId={googleId}>
            {!loaded ? (
                <Loading />
            ) : (
                <div className="cont h-screen flex justify-center items-center">
                    <div className="container cont-login mx-auto w-1/3 h-4/6 rounded-lg bg-black p-8 flex flex-col justify-center items-center">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                            <div className='flex flex-col items-center justify-center w-full mb-4'>
                                <label htmlFor="user" className='mb-2'>
                                    <p>User:</p>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="user"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="p-2 w-full rounded-md text-emerald-900"
                                />
                                {errors.name && <p className="text-red-500 pt-2">{errors.name}</p>}
                            </div>

                            <div className='flex flex-col items-center justify-center w-full mb-4'>
                                <label htmlFor="password" className='mb-2'>
                                    <p>Password:</p>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="p-2 w-full rounded-md text-emerald-900"
                                />
                                {errors.password && <p className="text-red-500 pt-2">{errors.password}</p>}
                            </div>

                            <div className="flex flex-row gap-4 justify-center items-center mt-4">
                                <button disabled={disableFunction()} type="submit" className="bg-green-700 text-white p-2 rounded">
                                    Log in
                                </button>
                                <Link to="/register">
                                    <button className="bg-gray-500 text-white p-2 rounded">
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        </form>
                
                        <div className="mt-6">
                            <Login />
                        </div>
                    </div>
                </div>
            )}
        </GoogleOAuthProvider>
    );
}

export default LoginPage;
