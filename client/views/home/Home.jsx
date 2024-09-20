import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Cards from "../../components/cards/Cards";
import { get_all_chars } from "../../redux/action";
import Navbar from "../../components/nav/Nav";

function Home () {

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_all_chars());
    }, [])
    const allCharacters = useSelector((state) => state.allCharacters);
    console.log(allCharacters);
    return(
        <div>
            <h1>Componente home</h1>
            <Navbar/>
            <Cards allCharacters= {allCharacters}/>
        </div>
    )
}

export default Home
