import CommentService from "../../services/CommentService";
export const ADD = 'ADDCOMMENT';
export const FETCH = 'FETCHCOMMENT';
export const DELETE = 'DELETECOMMENT';
export const UPDATE = 'UPDATECOMMENT';

export const addComment = (newComment) => {
    return async (dispatch, getState) => {
        dispatch({ type: ADD, newComment: { ...newComment } });
    }
}

export const fetchComments = () => {
    return async (dispatch, getState) => {
        const comments = await CommentService.getComments();
        console.log('all comments >', comments);
        dispatch({ type: FETCH, newComments: comments });
    }
}

export const updateComment = (commentId, liked, counter) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE, commentId: commentId, liked: liked, counter: counter });
    }
}