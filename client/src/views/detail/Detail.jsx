import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { clear_details, get_char_id } from "../../redux/action"
import { Link } from "react-router-dom"

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

    console.log(character);
    
    return(
        character.image ? (<div>
            <Link to={'/home'}><button>Home</button></Link>
            <h1>{character.name}</h1>
            <p>{character.status}</p>
            <p>{character.species}</p>
            <p>{character.type}</p>
            <p>{character.gender}</p>
            <p>{character.origin}</p>
            <p>{character.location}</p>
            <img src={character.image} alt="" />
        </div>
    ) : (
            <div>
                <h1>Cargando...</h1>
            </div>
        )
    )
}

export default Detail;