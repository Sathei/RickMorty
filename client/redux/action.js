import axios from 'axios';
import { 
    CLEAR_DETAILS,
    GET_ALL_CHARS,
    GET_CHAR_ID,
    LOGIN_REQUEST,
    LOGIN_SUCESS,
    LOGIN_FAILED

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

export const login_request = () => ({
    type: LOGIN_REQUEST
})

export const login_success = (userData) => ({
    type: LOGIN_SUCESS,
    payload: userData
})

export const login_failed = (error) => ({
    type: LOGIN_FAILED,
    payload: error
})


export const create_char = (character) => {
    return async function(){
        try {
            await axios.post("http://localhost:3001/create", character);
            alert("Character created")
        } catch (error) {
            alert("Error creating character", error.response.data.error)
        }
    }
}

export const create_user = (user) => {
    return async function (dispatch) {

        dispatch(login_request());
        try {
            const response = await axios.post("http://localhost:3001/login", user);

            const {token, userId} = response.data;
            dispatch({token, userId});
            alert('Login succesfully');
        } catch (error) {
            const errorMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error
            : 'Error logging in'
            alert(`Failed loging in: ${errorMsg}`)
        }
    }
}