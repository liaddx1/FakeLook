import UserService from "../../services/UserService";
export const SET = 'SETUSER';
export const ADD = 'ADDUSER';
export const FETCH = 'FETCHUSER';
export const DELETE = 'DELETEUSER';
export const UPDATE = 'UPDATEUSER';

export const setUser = (userId) => {
    return async (dispatch, getState) => {
        const newUser = await UserService.getUserById(userId);

        dispatch({ type: SET, newUser: { ...newUser.data, userId } })
    }
}

export const addUser = (newUser, userId) => {
    return async (dispatch, getState) => {
        dispatch({ type: ADD, newUser: { ...newUser, userId } })
    }
}

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const users = await UserService.getAllUsers();
        dispatch({ type: FETCH, newUsers: users })
    }
}

export const updateUser = (newUser) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE, newUser: { ...newUser } })
    }
}