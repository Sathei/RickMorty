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
            <div className="filters-container flex gap-2">
    <select name="gender" id="gender" onChange={handleFilter}>
        <option value="">Gender: All</option>
        {options.genders?.map((gender, index) => (
            <option key={index} value={gender}>{gender}</option>
        ))}
    </select>

    <select name="status" id="status" onChange={handleFilter}>
        <option value="">Status: All</option>
        {options.status?.map((stat, index ) => (
            <option key={index} value={stat}>{stat}</option>
        ))}
    </select>

    <select name="specie" id="specie" onChange={handleFilter}>
        <option value="">Species: All</option>
        {options.species?.map((specie, index) => (
            <option key={index} value={specie}>{specie}</option>
        ))}
    </select>

    <select name="type" id="type" onChange={handleFilter}>
        <option value="">Type: All</option>
        {options.types?.map((type, index) => (
            <option key={index} value={type}>{type}</option>
        ))}
    </select>
</div>
        </div>   
    )
}

export default Filters;