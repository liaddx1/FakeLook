// import axios from 'axios';
// import { runPostRequest } from '../../services/httpInvoker';
import UserService from "../../services/UserService";
export const SET = 'SETUSER';
export const ADD = 'ADDUSER';
export const FETCH = 'FETCHUSER';
export const DELETE = 'DELETEUSER';
export const UPDATE = 'UPDATEUSER';

// TODO update everything here basicly...

export const setUser = (userId) => {
    return async (dispatch, getState) => {
        console.log('setting user');
        const newUser = await UserService.getUserById(userId);
        console.log(newUser.data);

        dispatch({ type: SET, newUser: { ...newUser.data, userId } })
    }
}

export const addUser = (newUser, userId) => {
    return async (dispatch, getState) => {

        dispatch({ type: ADD, newUser: { ...newUser, userId } })
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