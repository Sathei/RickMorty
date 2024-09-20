import axios from 'axios';
import { 
    CLEAR_DETAILS,
    GET_ALL_CHARS,
    GET_CHAR_ID

 } from "./action-types";

export const get_all_chars = () => {
    return async function(dispatch){
        try {
            const { data } = await axios('http://localhost:3001/characters')
            dispatch({
                type: GET_ALL_CHARS,
                payload: data
            })
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
}

export const get_char_id = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/character/${id}`);
            console.log(data);
            
            dispatch({
                type:GET_CHAR_ID,
                payload: data
            })
        } catch (error) {
            console.log('Error fetching data', error);
            
        }
    }
}

export const clear_details = () => {
    return async function(dispatch) {
        try {
            dispatch({
                type: CLEAR_DETAILS,
            })
        } catch (error) {
            console.log('Error fetching data', error);
        }
    }
}