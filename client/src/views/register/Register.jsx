import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register_user } from "../../redux/action";

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
            setErrors({ ...errors, name: "Must have at least 3 caracters" });
          } else {
            if (state.name.length > 12) {
              setErrors({
                ...errors,
                name: "Must have less than 12 caracters",
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
            setErrors({ ...errors, password: "Must have than 3 caracters" });
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
    console.log("Signed in succesfully", newUser);
    navigate('/login');
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            name="name"
            id="name" 
            value={newUser.name}
            onChange={handleChange}
        />

        {errors.name && <p>{errors.name}</p>}
        <br />
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            value={newUser.password}
            onChange={handleChange}
        />

        {errors.password && <p>{errors.password}</p>}

        <br />
        <button disabled={disableFunction()} type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Register;
