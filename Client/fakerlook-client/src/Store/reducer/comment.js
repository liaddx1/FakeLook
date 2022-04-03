import { ADD, FETCH, UPDATE } from "../actions/comment";
const initialState = {
    comments: [],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD:
            const comments = state.comments;
            comments.push({ ...action.newComment });
            console.log(comments);
            return { ...state, comments: comments };

        case FETCH:
            if (action.newComments) {
                return { ...state, comments: action.newComments, filteredComments: action.newComments };
            }
            return state;

        case UPDATE:
            const tempComments = state.comments;
            const index = tempComments.findIndex(u => u.postId === action.postId);
            const post = tempComments.find(u => u.postId === action.postId);
            post.postLikes.liked = action.liked;
            post.postLikes.postLikeAmount = action.counter;
            const newCommentsArray = tempComments.filter(u => u.postId !== action.postId);
            newCommentsArray.splice(index, 0, { ...post });
            return { ...state, comments: newCommentsArray };
        default: return state;
    }
}
export default reducer;