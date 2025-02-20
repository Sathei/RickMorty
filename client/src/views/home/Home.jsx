    import { useEffect, useState } from "react";
    import { useDispatch, useSelector } from "react-redux";

    import Cards from '../../components/cards/Cards'
    import Loading from "../loading/loading";
    import Pagination from "../../components/pagination/Pagination";
    import { get_all_chars, login_success, setPage } from "../../redux/action";
    import Navbar from "../../components/nav/Nav";
    import { useNavigate } from "react-router-dom";
    import './home.css';

    function Home () {

        const paginatedCharacters = useSelector((state) => state.paginatedChars || []);
        //const searchResults = useSelector((state) => state.results || []);
        const dispatch = useDispatch();
        


        const navigate = useNavigate();
        const { userOk }  = useSelector((state) => ({
            userOk: state.user,
            //error: state.error
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
            dispatch(get_all_chars()).then(() => {
                setLoaded(true)
                dispatch(setPage(1))
            });
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch]);


        useEffect(() => {
            if(userOk && paginatedCharacters.length === 0) {
                dispatch(setPage(1)); // Configura la página solo si no está configurada
                navigate('/home');
            }
        }, [dispatch, navigate, paginatedCharacters.length, userOk]);

        const characterToDisplay = paginatedCharacters ;  


        const savedUserData = JSON.parse(localStorage.getItem('user'));
        const userName = savedUserData ? savedUserData.name: null;
        
        return (
            <div className="w-full">
                {loaded
                    ?(
                        !userName
                            ?   
                                (
                                    <>
                                        <Navbar/>
                                        <div className="bg-gradient-to-r from-blue-700 to-purple-950">
                                            <Cards allCharacters={characterToDisplay}/>
                                            <Pagination/>
                                        </div>
                                    </>
                                )
                            : 
                                (
                                    <>  
                                        <div className="w-full h-16 content-center bg-slate-900 text-emerald-600 text-4xl">
                                            <h1><b>Welcome {userName}</b></h1>
                                        </div>
                                        <Navbar/>
                                        <div className="bg-gradient-to-r from-blue-700 to-purple-950">
                                            <Cards allCharacters={characterToDisplay}/>
                                            <Pagination/>
                                        </div>
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
