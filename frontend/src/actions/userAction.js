import axios from 'axios';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS } from '../constants/userConstant'

// Login
export const login = (email, password ) => async(dispatch) =>{
    try {
        dispatch({ 
            type:LOGIN_REQUEST 
        })
        
        const config = { headers: {'Content-Type': 'application/json' }}

        const { data } = await axios.post('/api/v1/login', { email, password}, config) 

        dispatch({ 
            type:LOGIN_SUCCESS,
            payload: data.user 
        })
    
    } catch (error) {
        dispatch({ 
            type:LOGIN_FAIL,
            payload: error.response.data.message 
        })
    }
}

// Register
export const register = ( userData ) => async(dispatch) =>{
    try {
        dispatch({ 
            type:REGISTER_REQUEST
        })
        
        const config = { headers: {'Content-Type': 'multipart/json' }}

        const { data } = await axios.post('/api/v1/register', userData, config) 

        dispatch({ 
            type:REGISTER_SUCCESS,
            payload: data.user
        })
    
    } catch (error) {
        dispatch({ 
            type:REGISTER_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Load users
export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({ 
            type:LOAD_REQUEST
        })
        
        const { data } = await axios.get('/api/v1/me') 

        dispatch({ 
            type:LOAD_SUCCESS,
            payload: data.user 
        })
    
    } catch (error) {
        dispatch({ 
            type:LOAD_FAIL,
            payload: error.response.data.message 
        })
    }
}

// Logout user
export const logout = () => async(dispatch) =>{
    try {

        await axios.get('/api/v1/logout') 

        dispatch({ 
            type:LOGOUT_SUCCESS,
        })
    
    } catch (error) {
        dispatch({ 
            type:LOGOUT_FAIL,
            payload: error.response.data.message 
        })
    }
}

// Update profile 
export const updateProfile = ( userData ) => async(dispatch) =>{
    try {
        dispatch({ 
            type:UPDATE_PROFILE_REQUEST
        })
        
        const config = { headers: {'Content-Type': 'multipart/json' }}

        const { data } = await axios.put('/api/v1/me/update', userData, config) 

        dispatch({ 
            type:UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    
    } catch (error) {
        dispatch({ 
            type:UPDATE_PROFILE_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Clearing Errors
export const clearError = () => async(dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}