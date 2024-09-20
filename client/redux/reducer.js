import { 
    GET_ALL_CHARS,
    GET_CHAR_ID,
    CLEAR_DETAILS

 } from "./action-types";

const initialState = {
    allCharacters: [],
    allCharactersBackup: [],
    character: {},

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

        default: 
            return state;
    }
}

export default reducer