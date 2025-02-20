/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Button = ({ link, text, onClick, className = "" }) => {
    const handleOnClick = (event) => {
        if (onClick) {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <Link to={link}>
            <button onClick={handleOnClick} className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition ${className}`}>
                {text}
            </button>
        </Link>
    );
};

export default Button;