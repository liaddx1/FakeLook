import PostService from "../../services/PostService";
export const ADD = 'ADDPOST';
export const FETCH = 'FETCHPOST';
export const DELETE = 'DELETEPOST';
export const UPDATE = 'UPDATEPOST';
export const FILTER = 'FILTERPOST';

export const addPost = (newPost) => {
    return async (dispatch, getState) => {
        dispatch({ type: ADD, newPost: { ...newPost } });
    }
}

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const posts = await PostService.getAllPosts();
        dispatch({ type: FETCH, newPosts: posts });
    }
}

export const updatePost = (postId, liked, counter) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE, postId: postId, liked: liked, counter: counter });
    }
}

export const applyFilter = (newList) => {
    return async (dispatch, getState) => {
        dispatch({ type: FILTER, newPosts: newList });
}
}