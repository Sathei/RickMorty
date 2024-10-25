import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Cards from '../../components/cards/Cards'
import { get_all_chars, login_success } from "../../redux/action";
import Navbar from "../../components/nav/Nav";
import { createSelector } from 'reselect';
import { useNavigate } from "react-router-dom";

function Home () {

    const user = useSelector((state) => state.user); 
    const allCharacters = useSelector((state) => state.allCharacters);
    const searchResults = useSelector((state) => state.results);
    const dispatch = useDispatch();
    


    const navigate = useNavigate();
    const { userOk }  = useSelector(state => ({
        userOk: state.user,
        error: state.error
    }))

    

    
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            dispatch(login_success(savedUser)); // Asegúrate de que el payload sea correcto
            console.log('nombre del usuario recuperado de localStorage' , savedUser.name );
        }
        if(userOk) {
            navigate('/home');
        }
        dispatch(get_all_chars());
    }, [dispatch]);

    const characterToDisplay = searchResults.length > 0 ? searchResults : allCharacters;  
   

    const savedUserData = JSON.parse(localStorage.getItem('user'));
    const userName = savedUserData ? savedUserData.name: null;
    
    return (
        <div>
            <h1>Componente home</h1>
            <h2>Welcome { userName }</h2>
            <Navbar />
            <Cards allCharacters={characterToDisplay} />
        </div>
    );
}

export default Home
