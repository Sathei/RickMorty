import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cards from '../../components/cards/Cards'
import Loading from "../loading/loading";
import { get_all_chars, login_success } from "../../redux/action";
import Navbar from "../../components/nav/Nav";
import { useNavigate } from "react-router-dom";
import './home.css';

function Home () {

    
    const allCharacters = useSelector((state) => state.allCharacters);
    const searchResults = useSelector((state) => state.results);
    const dispatch = useDispatch();
    


    const navigate = useNavigate();
    const { userOk }  = useSelector(state => ({
        userOk: state.user,
        error: state.error
    }))

    const [loaded, setLoaded] = useState(false)
    const [loadingDuration, setLoadingDuration] = useState(3000);
    

    
    useEffect(() => {
        const startTime = Date.now();
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            dispatch(login_success(savedUser));
        }
        if(userOk) {
            navigate('/home');
        }
        const endTime = Date.now();
        const totalDuration = endTime - startTime;
        setLoadingDuration(totalDuration > 3000 ? totalDuration : 3000)
        dispatch(get_all_chars()).then(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if(userOk){
            navigate('/home');
        }
    },[userOk, navigate])

    const characterToDisplay = searchResults.length > 0 ? searchResults : allCharacters;  


    const savedUserData = JSON.parse(localStorage.getItem('user'));
    const userName = savedUserData ? savedUserData.name: null;
    
    return (
        <div>
            {loaded
                ?(
                    !userName
                        ?   
                            (
                                <>
                                    <Navbar/>
                                    <Cards allCharacters={characterToDisplay}/>
                                </>
                            )
                        : 
                            (
                                <>
                                    <h2>Welcome {userName}</h2>
                                    <Navbar/>
                                    <Cards allCharacters={characterToDisplay}/>
                                </>
                            )
                )       
                :(
                    <>
                        <Loading duration={loadingDuration}/>
                    </>
                )
            }
        </div>
    );
}

export default Home
