import { ADD, FETCH, DELETE, UPDATE } from "../actions/user";
const initialState = {
    users: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
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