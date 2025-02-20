import { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchChar, get_all_chars, setPage } from "../../redux/action";

function Searchbar() {
    const dispatch = useDispatch();
    const [character, setCharacter] = useState('');
    const [empty, setEmpty] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchChar(character));
        dispatch(setPage(1));
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setCharacter(value);
        setEmpty(value.trim() === '');
    };

    const clearSearch = () => {
        setCharacter('');
        setEmpty(true);
        dispatch(get_all_chars());
        dispatch(setPage(1));
    };

    return (
        <div className="flex justify-center w-full mt-3 mb-3 max-h-20">
            <form onSubmit={handleSubmit} className="flex items-center w-2/3 max-w-md mr-2">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={character}
                    onChange={handleChange}
                    placeholder="Search characters"
                    className="p-2 h-10 w-full border rounded-l-full border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={clearSearch}
                    className={`flex items-center justify-center h-10 w-10 bg-white border border-l-0 border-gray-300 text-red-600 hover:bg-red-600 hover:text-white transition-colors ${empty ? 'hidden' : ''}`}
                >
                    <img className="w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" alt="clear" />
                </button>
                <button
                    type="submit"
                    disabled={empty}
                    className="flex items-center justify-center h-10 w-10 bg-white border border-l-0 border-gray-300 text-blue-600 hover:bg-green-950 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md"
                >
                    <img className="w-full h-3/4" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/search-1702542-1486957.png?f=webp&w=256" alt="search" />
                </button>
            </form>
        </div>
    );
}

export default Searchbar;
