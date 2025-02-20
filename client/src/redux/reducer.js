/* eslint-disable no-case-declarations */
import { 
    GET_ALL_CHARS,
    GET_CHAR_ID,
    CLEAR_DETAILS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SEARCH,
    SET_PAGE,
    SET_CHAR,
    SET_FILTERS

} from "./action-types";

const initialState = {
    allCharacters: [],
    allCharactersBackup: [],
    currentPage: 1,
    charPerPage: 20,
    paginatedChars: [],
    character: {},
    results: [],
    loading: false,
    user: null,
    error: null,
    gender: "",
    status: "",
    type: "",
    specie: "",

}

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case GET_ALL_CHARS:
            return {
                ...state,
                allCharacters: [...action.payload],
                allCharactersBackup: action.payload,
                currentPage: 1,  // Reinicia la paginación
                paginatedChars: action.payload.slice(0, state.charPerPage),  // Muestra solo los primeros 20 personajes
                results: []
            };
        case GET_CHAR_ID:

            // eslint-disable-next-line no-case-declarations
            const characterData = action.payload
            return {
                ...state,
                character: characterData
            }
        case CLEAR_DETAILS:
            return {
                ...state,
                character: {}
            }

        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            }

        case LOGIN_FAILED: 
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }
        
            case SEARCH:
    return {
        ...state,
        results: action.payload, // Ahora contiene TODOS los personajes encontrados
        currentPage: 1,
        paginatedChars: action.payload.slice(0, state.charPerPage) // Muestra los primeros 20
    };
        case SET_CHAR:
            return {
                ...state,
                allCharacters: [...action.payload],
                paginatedChars: action.payload.slice(0, state.charPerPage),

            };
        
            case SET_PAGE:
    const startIndex = (action.payload - 1) * state.charPerPage;
    const endIndex = startIndex + state.charPerPage;
    const dataToPaginate = state.results.length > 0 ? state.results : state.allCharacters;  // Usa results si hay una búsqueda activa
    
    return {
        ...state,
        currentPage: action.payload,
        paginatedChars: dataToPaginate.slice(startIndex, endIndex),
    };

        case SET_FILTERS:

            const filteredCharacters = state.allCharactersBackup.filter((char) => {
                return (
                    (action.payload.gender ? char.gender === action.payload.gender : true) &&
                    (action.payload.status ? char.status === action.payload.status : true) &&
                    (action.payload.type ? char.type === action.payload.type :  true) &&
                    (action.payload.specie ? char.species === action.payload.specie :  true) 
                )
            })
            return {
                ...state,
                ...action.payload,
                allCharacters: filteredCharacters,
                currentPage: 1,
                paginatedChars: filteredCharacters.slice(0, state.charPerPage)
            }

        default: 
            return state;
    }
}

export default reducer