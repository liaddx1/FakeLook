import usersActionTypes from "./usersActionTypes";

const usersLoadStart = () => ({
    type: usersActionTypes.USERS_LOAD_START
});

const usersLoadSuccess = (users) => ({
    type: usersActionTypes.USERS_LOAD_SUCCESS,
    payload: users
});

const usersLoadError = (errorMessage) => ({
    type: usersActionTypes.USERS_LOAD_ERROR,
    payload: errorMessage
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    usersLoadStart,
    usersLoadSuccess,
    usersLoadError,
}