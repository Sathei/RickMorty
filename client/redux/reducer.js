import { 
    GET_ALL_CHARS,
    GET_CHAR_ID,
    CLEAR_DETAILS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED

 } from "./action-types";

const initialState = {
    allCharacters: [],
    allCharactersBackup: [],
    character: {},
    loading: false,
    user: null,
    error: null,

}

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case GET_ALL_CHARS:
            return {
                ...state,
                allCharacters: [...action.payload],
                allCharactersBackup: action.payload,
            }
        case GET_CHAR_ID:

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

        default: 
            return state;
    }
}

export default reducer