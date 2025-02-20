import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { clear_details, get_char_id } from "../../redux/action"
import { Link } from "react-router-dom"
import Loading from "../loading/loading"

import backgroundImg from '../../assets/rick-and-morty-in-the-beach-sunset-lp5645l0h01qloh8.webp';

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const character = useSelector(state => state.character);
    console.log(character);
    


    useEffect(() => {

        dispatch(get_char_id(params.id))
        return ()=>{
            dispatch(clear_details())
        }
    }, [params.id, dispatch])

    
    
    return(
        character.image ? (
            <div 
                className="flex items-center justify-center min-h-screen"
                style={{
                    background: `url(${backgroundImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="absolute top-5 left-5">
                        <Link to={'/home'}>
                            <button className="bg-[#452dcc] text-white font-bold px-4 py-2 rounded-md transition duration-300 hover:bg-[#381874] shadow-md">
                                Home
                            </button>
                        </Link>
                    </div>
                <div className="flex flex-row border border-gray-300 bg-white bg-opacity-20 backdrop-blur-md shadow-lg p-10 w-3/4 rounded-md mx-auto">
                    

                    <div className="flex flex-col text-left text-xl gap-3 w-2/3">
                            <h1 className="text-3xl font-bold"><strong>Name: </strong>{character.name}</h1>
                            <p><strong>Status: </strong>{character.status}</p>
                            <p><strong>Specie: </strong>{character.species}</p>
                            <p><strong>Type: </strong>{character.type}</p>
                            <p><strong>Gender: </strong>{character.gender}</p>
                            <p><strong>Origin: </strong>{character.origin}</p>
                            <p><strong>Location: </strong>{character.location}</p>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <img src={character.image} alt="" className="rounded-lg shadow-lg max-w-xs"/>
                    </div>
                    
                </div>
            </div>
    ) : (
            <div className="min-h-screen flex items-center justify-center bg-blue-600">
                <Loading/>
            </div>
        )
    )
}

export default Detail;