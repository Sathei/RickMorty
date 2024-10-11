import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchChar, get_all_chars } from "../../redux/action";


function Searchbar () {

    const dispatch = useDispatch();

    const [ character, setCharacter ] = useState('');

    const [ empty, setEmpty ] = useState(true);

    const results = useSelector((state) => state.results)
    console.log('esto es results' , results , 'esto es el char buscado' , character);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchChar(character))
        console.log('character buscado' , character);
        
    }

    const handleChange = (event) => {
        const { value } = event.target
        setCharacter(value);
        
        if(value.trim() === ''){
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }

    const disableFunction = () => {
        return empty
    }

    const clearSearch = () => {
        setCharacter('');
        setEmpty(true);
        dispatch(get_all_chars())
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={character}
                    onChange={handleChange}
                 />
                 <button type="button" onClick={clearSearch}>X</button>
                <button type="submit" disabled={disableFunction()}>Search</button>
            </form>
        </div>
    )
}

export default Searchbar