import { ADD, FETCH, DELETE, UPDATE } from "../actions/post";
const initialState = {
    posts: [],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD:
            const posts = state.posts;
            posts.push({ ...action.newPost, timePosted: new Date() });
            console.log(posts);
            return { ...state, posts: posts };

        case FETCH:
            if (action.newPosts) {
                return { ...state, posts: action.newPosts };
            }
            return state;

        case DELETE: return state;

        case UPDATE:
            const tempPosts = state.posts;
            const index = tempPosts.findIndex(u => u.postId === action.newPost.postId);
            const newPostsArray = tempPosts.filter(u => u.postId !== action.newPost.postId);
            newPostsArray.splice(index, 0, { ...action.newPost });
            return { ...state, posts: newPostsArray };
        default: return state;
    }
}
export default reducer;