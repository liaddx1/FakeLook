import { SET, ADD, FETCH, DELETE, UPDATE } from "../actions/user";
const initialState = {
    currentUser: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET:

            return { ...state, currentUser: action.newUser }
        case ADD:

            return { ...state, }

        case FETCH:

            return { ...state, }

        case DELETE: return state;

        case UPDATE:

            return { ...state, }
        default: return state;
    }
}
export default reducer;