import PostService from "../../services/PostService";
export const ADD = 'ADDPOST';
export const FETCH = 'FETCHPOST';
export const DELETE = 'DELETEPOST';
export const UPDATE = 'UPDATEPOST';

export const addPost = (newPost) => {
    return async (dispatch, getState) => {
        dispatch({ type: ADD, newPost: { ...newPost } })
    }
}

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const posts = await PostService.getAllPosts();
        console.log(posts);
        dispatch({ type: FETCH, newPosts: posts })
    }
}

export const updatePost = (newPost) => {
    return async (dispatch) => {
        console.log(newPost);
        dispatch({ type: UPDATE, newPost: { ...newPost } })
    }
}