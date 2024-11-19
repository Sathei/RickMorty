import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { clear_details, get_char_id } from "../../redux/action"
import { Link } from "react-router-dom"
import Loading from "../loading/loading"

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const character = useSelector(state => state.character);


    useEffect(() => {

        dispatch(get_char_id(params.id))
        return ()=>{
            dispatch(clear_details())
        }
    }, [params.id, dispatch])

    
    
    return(
        character.image ? (
            <div className="flex flex-row bg-blue-600 w-full min-h-screen">
                <div className="flex flex-col items-start p-3 mb-10">
                    <Link to={'/home'}><button>Home</button></Link>
                    <div className="flex flex-row mt-10">
                        <div>
                            <h1>{character.name}</h1>
                            <p className="text-xl">{character.status}</p>
                            <p>{character.species}</p>
                            <p>{character.type}</p>
                            <p>{character.gender}</p>
                            <p>{character.origin}</p>
                            <p>{character.location}</p>
                        </div>
                        <div>
                            <img src={character.image} alt="" />
                        </div>
                </div>

                </div>
            </div>
    ) : (
            <div>
                <Loading/>
            </div>
        )
    )
}

export default Detail;