import { useEffect, useState  } from "react";
import { useDispatch } from 'react-redux';
import { setFilters, setPage } from '../../redux/action.js';
import axios from 'axios';
const url = 'http://localhost:3001/filters-options'

function Filters() {

    const dispatch = useDispatch();

    const [ options, setOptions ] = useState({
        genders: [],
        types: [],
        species: [],
        status: []
    });

    const [ optionSelec, setOptionSelect ] = useState({
        gender: "",
        type: "",
        specie: "",
        status: "",
    });

    const handleFilter = (event) => {
        const { name, value } = event.target;
        
        const newFilters = {
            ...optionSelec,
            [name]: value
        };
        
        setOptionSelect(newFilters)
        
        dispatch(setFilters(newFilters));
        dispatch(setPage(1));
    }

    useEffect(() => {
        const getOptions = async () => {
            try {
                const { data } = await axios.get(url)
                console.log('esto es data: ' , data );
                
                setOptions(prev => ({
                    ...prev,
                    genders: data.genders || [],
                    types: data.types || [],
                    species: data.species || [],
                    status: data.status || []
                }));
            } catch (error) {
                console.log('Error getting options');
            }
        }
        getOptions();
    },[])

    return(
        <div className="flex flex-wrap p-2 gap-2">
            <div className="">
                <label htmlFor="gender">Gender: </label>
                <select name="gender" id="gender" onChange={handleFilter}>
                    <option value="">All</option>
                    {options.genders?.map((gender, index) => (
                        <option key={index} value={gender}>{gender}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="status">Status: </label>  
                <select name="status" id="status" onChange={handleFilter}>
                    <option value="">All</option>
                    {options.status?.map((stat, index ) => (
                        <option key={index} value={stat}>{stat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="specie">Species: </label>  
                <select name="specie" id="specie" onChange={handleFilter}>
                <option value="">All</option>
                    {options.species?.map((specie, index) => (
                        <option key={index} value={specie}>{specie}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="type">Type: </label>  
                <select name="type" id="type" onChange={handleFilter}>
                <option value="">All</option>
                    {options.types?.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="mt-4">
                <h3>Filtros seleccionados:</h3>
                <p>Gender: {optionSelec.gender || "All"}</p>
                <p>Status: {optionSelec.status || "All"}</p>
                <p>Species: {optionSelec.specie || "All"}</p>
                <p>Type: {optionSelec.type || "All"}</p>
            </div>
        </div>   
    )
}

export default Filters;