import React, { useState, useCallback, useEffect } from 'react';
import { RiHeartFill, RiHeartLine, } from "react-icons/ri";
import { formatRelative } from "date-fns";
import CommentService from '../services/CommentService';

const Comment = props => {
    const [likeStatus, setLikeStatus] = useState(false);
    const [likesCounter, setLikesCounter] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoveButtonClick = useCallback(async () => {
        if (likeStatus) {
            await CommentService.removeLike(props.commentId, localStorage.getItem("userId")).then((response) => {
                if (response.message) {
                    setErrorMessage(response.message);
                    return;
                }
                setLikeStatus(!likeStatus);
                setLikesCounter(previous => { return previous - 1 });
            });
            return;
        }

        await CommentService.addLike(props.commentId, localStorage.getItem("userId")).then((response) => {
            console.log(response);
            if (response.message) {
                setErrorMessage(response.message);
                return;
            }
            setLikeStatus(!likeStatus);
            setLikesCounter(previous => { return previous + 1 });
        });
    }, [likeStatus, props]);

    useEffect(() => {
        setLikeStatus(props.liked);
        setLikesCounter(props.commentLikeAmount);
    }, [props.commentLikeAmount, props.liked])

    return (
        <div key={props.commentId} className="shadow-sm rounded-3 border-primary p-3 mt-4">
            <div className="d-flex align-items-center my-2">
                <div className="me-auto mx-1">
                    <div className="mx-3">
                        <img className="rounded-pill" src={props.picture} height="40px" width="40" alt="profile" />
                    </div>
                </div>
                <div className="w-100 mx-1 fw-bold">
                    <span>{`${props.firstName} ${props.lastName}`}</span>
                    <div className="text-secondary">{formatRelative(new Date(props.timeCommented), new Date())}</div>
                </div>
            </div>
            <div className='text-center my-2'>{props.commentContent}</div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="mx-3">
                    <span
                        className={`loveButton mx-1 fs-4`}
                        onClick={handleLoveButtonClick}
                    >
                        {likeStatus ?
                            <RiHeartFill className="text-danger" />
                            :
                            <RiHeartLine className="text-danger" />
                        }
                    </span>
                    <span>
                        {likesCounter >= 0 ? likesCounter : null}
                    </span>
                </div>
            </div>
            {errorMessage && <div className='text-center mt-3 alert alert-danger'>{errorMessage}</div>}
        </div >
    );
}

export default Comment;