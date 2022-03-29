import { SET, ADD, FETCH, DELETE, UPDATE } from "../actions/user";
const initialState = {
    currentUser: [],
    users: [],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET:
            return { ...state, currentUser: action.newUser };
        case ADD:
            const users = state.users;
            users.push({ ...action.newUser, addedAt: new Date().toDateString() });
            return { ...state, users: users };

        case FETCH:
            if (action.newUsers) {
                return { ...state, users: action.newUsers };
            }
            return state;

        case DELETE: return state;

        case UPDATE:
            const tempUsers = state.users;
            const index = tempUsers.findIndex(u => u.userId === action.newUser.userId);
            const newUsersArray = tempUsers.filter(u => u.userId !== action.newUser.userId);
            newUsersArray.splice(index, 0, { ...action.newUser });
            return { ...state, users: newUsersArray };
        default: return state;
    }
}
export default reducer;