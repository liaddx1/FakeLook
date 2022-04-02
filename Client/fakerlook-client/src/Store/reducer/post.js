import { ADD, FETCH, FILTER, UPDATE } from "../actions/post";
const initialState = {
    posts: [],
    filteredPosts: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD:
            const posts = state.posts;
            posts.push({ ...action.newPost });
            console.log(posts);
            return { ...state, posts: posts };

        case FETCH:
            if (action.newPosts) {
                return { ...state, posts: action.newPosts, filteredPosts: action.newPosts };
            }
            return state;

        case FILTER:
            if (action.newPosts) {
                return { ...state, filteredPosts: action.newPosts };
            }
            return state;

        case UPDATE:
            const tempPosts = state.posts;
            const index = tempPosts.findIndex(u => u.postId === action.postId);
            const post = tempPosts.find(u => u.postId === action.postId);
            post.postLikes.liked = action.liked;
            post.postLikes.postLikeAmount = action.counter;
            const newPostsArray = tempPosts.filter(u => u.postId !== action.postId);
            newPostsArray.splice(index, 0, { ...post });
            return { ...state, posts: newPostsArray };
        default: return state;
    }
}
export default reducer;