import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register_user } from "../../redux/action";

import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "Required",
    password: "Required",
  });

  const validate = (state, name) => {
    switch (name) {
      case "name":
        if (state.name === "") {
          setErrors({ ...errors, name: "Required" });
        } else {
          if (state.name.length < 3) {
            setErrors({ ...errors, name: "Must have at least 3 characters" });
          } else {
            if (state.name.length > 12) {
              setErrors({
                ...errors,
                name: "Must have less than 12 characters",
              });
            } else {
              setErrors({ ...errors, name: "" });
            }
          }
        }
        break;

      case "password":
        if (state.password === "") {
          setErrors({ ...errors, password: "Required" });
        } else {
          if (state.password.length < 3) {
            setErrors({ ...errors, password: "Must have than 3 characters" });
          } else {
            setErrors({ ...errors, password: "" });
          }
        }
        break;

      default:
        break;
    }
  };

  const disableFunction = () => {
    for(const key in newUser) {
        if(newUser[key] === ""){
            return true;
        }
        
    }

    for(const error in errors) {
        if(errors[error] !== ""){
            return true;
        }
    }

    return false;
  }

  const handleChange = (event) => {
    const {name, value } = event.target;
    setNewUser({
        ...newUser,
        [name]: value
    });
    validate({...newUser, [name]:value}, name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register_user(newUser))
    console.log("Signed in successfully", newUser);
    navigate('/login');
  }

  return (
    <div className="body bg-slate-800 h-screen flex items-center">
        
            <div className="container cont-register flex flex-col p-2 justify-center mx-auto w-1/3 h-4/6 rounded-xl  text-white">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <div className="flex flex-col">
                      <label className="mb-3" htmlFor="name">Name:</label>
                      <input
                          type="text"
                          name="name"
                          id="name" 
                          value={newUser.name}
                          onChange={handleChange}
                          className=" w-full rounded-lg text-black p-2"
                      />

                      {errors.name && <p className="mt-3 p-1  content-center text-red-600 bg-black bg-opacity-70 rounded-lg">{errors.name}</p>}
                  <br />
                  <label className="mb-3" htmlFor="password">Password:</label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      value={newUser.password}
                      onChange={handleChange}
                      className=" w-full rounded-lg text-black p-2"
                      />

                  {errors.password && <p className="mt-3 p-1 content-center text-red-600 bg-black bg-opacity-70 rounded-lg">{errors.password}</p>}

                  </div>
                  <br />
                  <button className=" btn-sign bg-green-600  w-1/5 p-1 rounded-lg " disabled={disableFunction()} type="submit">Sign in</button>
                </form>
            </div>
        
    </div>
  );
};

export default Register;
