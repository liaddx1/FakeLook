// import axios from 'axios';
// import { runPostRequest } from '../../services/httpInvoker';
export const ADD = 'ADDUSER';
export const FETCH = 'FETCHUSER';
export const DELETE = 'DELETEUSER';
export const UPDATE = 'UPDATEUSER';

export const addUser = (newUser) => {
    return async (dispatch, getState) => {
        
        // dispatch({ type: ADD, newUser: { ...newUser, _id } })
    }
}

export const fetchUser = () => {
    return async (dispatch, getState) => {
        
        // dispatch({ type: FETCH, newUsers: responseData })
    }
}

export const editUser = (newUser, id) => {
    return async (dispatch) => {
        try {
            
        } catch { console.error('falied sending put request to server'); dispatch({ type: 'x' }) }
    }
}