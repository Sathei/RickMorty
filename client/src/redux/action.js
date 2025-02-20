import axios from 'axios';
import { 
    CLEAR_DETAILS,
    GET_ALL_CHARS,
    GET_CHAR_ID,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SEARCH,
    SET_PAGE,
    SET_CHAR,
    SET_FILTERS

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
    type: LOGIN_SUCCESS,
    payload: userData
})

export const login_failed = (error) => ({
    type: LOGIN_FAILED,
    payload: error
})

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page
})

export const setChar = (characters) => ({
    type: SET_CHAR,
    payload: characters
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

export const login_user = (user) => {
    return async function (dispatch) {
        dispatch(login_request());

       

        try {

            const response = await axios.post("http://localhost:3001/login", user);

            const { token, userId, name } = response.data;
            const userData = { token, userId, name };
            console.log( 'funcion login action' , userData);
            
            localStorage.setItem('user', JSON.stringify(userData));

            dispatch(login_success(userData));

            return true;
        } catch (error) {
            const errorMsg = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : error.message;
            dispatch(login_failed(errorMsg));
            return false;
        }
    };
};


export const register_user = (user) => {
    return async function(){
        try {
            await axios.post('http://localhost:3001/register', user)
            alert('User signed in succesfully')
        } catch (error) {
            console.error('Error signing in', error);
            
        }
    }
}

export const searchChar = (name) => {
    return async function (dispatch) {
        try {
            let allResults = [];
            let currentPage = 1;
            let url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${name}`;
            
            while (url) {
                const { data } = await axios(url);
                
                allResults = [...allResults, ...data.results];

                url = data.info?.next || null;
            }

            dispatch({
                type: SEARCH,
                payload: allResults
            });

        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };
};

export const setFilters = (filters) => ({
    type: SET_FILTERS,
    payload: filters
})