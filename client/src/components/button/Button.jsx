import { Link } from "react-router-dom"

const Button = ({ link, text, onClick}) => {

    const handleOnClick = (event) => {
        if(onClick){
            event.preventDefault()
            onClick();
        }
    }
    return(
        <Link to={link}>
            <button onClick={handleOnClick}>{text}</button>
        </Link>
    )
}

export default Button