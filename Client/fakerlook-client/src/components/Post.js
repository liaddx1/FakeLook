import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RiHeartFill, RiHeartLine, RiMessage2Fill, RiSendPlane2Fill, } from "react-icons/ri";
import { formatRelative } from "date-fns";
import PostLikeService from '../services/PostLikesService';
import { updatePost } from '../Store/actions/post';
import CommentService from '../services/CommentService';
import CommentOutput from '../models/CommentOutputModel';
import './Post.css';
import Comment from './Comment';

const Post = props => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const user = useSelector(state => state.users.users).find(u => u.userId === props.userId);
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [likeStatus, setLikeStatus] = useState(false);
    const [likesCounter, setLikesCounter] = useState(0);
    const [commentStatus, setCommentStatus] = useState(false);
    const [commentCounter, setCommentCounter] = useState(0);
    const [commentContent, setCommentContent] = useState("");

    const handleCommentButtonClick = () => setCommentStatus(!commentStatus);

    const handleLoveButtonClick = useCallback(async () => {
        if (likeStatus) {
            await PostLikeService.removeLike(props.postId, localStorage.getItem("userId")).then((response) => {
                if (response.message) {
                    setErrorMessage(response.message);
                    return;
                }
                setLikeStatus(!likeStatus);
                setLikesCounter(previous => { return previous - 1 });
            });
            const tempCounter = likesCounter - 1;
            dispatch(updatePost(props.postId, false, tempCounter));
            return;
        }

        await PostLikeService.addLike(props.postId, localStorage.getItem("userId")).then((response) => {
            if (response.message) {
                setErrorMessage(response.message);
                return;
            }
            setLikeStatus(!likeStatus);
            setLikesCounter(previous => { return previous + 1 });
        });
        const tempCounter = likesCounter + 1;
        dispatch(updatePost(props.postId, true, tempCounter));
    }, [likeStatus, props.postId, dispatch, likesCounter]);

    const isDisabled = useCallback(() => {
        return commentContent.trim().length <= 0 || commentContent.trim().length > 100;
    }, [commentContent])

    const handleCommentContentChange = useCallback((e) => {
        e.preventDefault();

        setCommentContent(e.target.value);
    }, []);

    const sendCommentHandler = async (e) => {
        e.preventDefault();

        const newComment = new CommentOutput(commentContent, user.firstName, user.lastName, user.userId, props.postId);

        const [value, message] = newComment.validate();

        setErrorMessage(message);

        if (value) {
            await CommentService.createComment(props.postId, localStorage.getItem("userId"), newComment).then(async (response) => {
                if (response.message) {
                    setErrorMessage(message);
                    return;
                }

                setCommentContent('');
                setComments([{ ...newComment, commentId: response.recordset[0].postId, commentLikeAmound: 0, liked: false, picture: user.picture, timeCommented: new Date() }, ...comments]);
                forceUpdate();
            })
        }
    }

    const getAllComments = useCallback(async () => {
        await CommentService.getComments(props.postId, localStorage.getItem('userId')).then((response) => {
            setComments(response.data.recordset);
        })
    }, [props.postId])

    useEffect(() => {
        setLikeStatus(props.postLikes.liked);
        setLikesCounter(props.postLikes.postLikeAmount);
        setCommentCounter(props.postCommentAmount);
        getAllComments();
    }, [props.postLikes.liked, props.postLikes.postLikeAmount, props.postCommentAmount, getAllComments]);

    useEffect(() => {
        setInterval(() => {
            setErrorMessage('');
        }, 15000);
    }, [setErrorMessage]);

    return (
        <div key={props.postId} className="shadow rounded-3 border-primary p-3 mt-4" >
            <Card className="border-0">
                <div className="d-flex align-items-center mb-3">
                    <div className="mx-3">
                        <img className="rounded-pill" src={user.picture} height="50px" width="50px" alt="profile" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
                        <div className="text-secondary">{formatRelative(new Date(props.timePosted), new Date())}</div>
                    </div>
                </div>
                <div className="mx-3">
                    <div>
                        <p>{props.description}</p>
                    </div>
                    {props.image !== null ? (
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <img height={"300px"} src={props.picture} alt="posted" />
                        </div>
                    ) : (
                        <span></span>
                    )}
                </div>

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

                    <div className="mx-3">
                        <span className="commentButton mx-1 fs-4" onClick={handleCommentButtonClick}>
                            <RiMessage2Fill className="text-primary" />
                        </span>
                        <span>
                            {commentCounter >= 0 ? commentCounter : null} {/* Number of Comments */}
                        </span>
                    </div>

                </div>

                {errorMessage && <div className='text-center mt-3 alert alert-danger'>{errorMessage}</div>}

                {/* List of comments and comment input box */}
                {commentStatus ? (
                    <div className="mt-3">
                        <div className="d-flex align-items-center">
                            <Form className="w-100 mx-1" onSubmit={sendCommentHandler}>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentContent}
                                        onChange={handleCommentContentChange}
                                        maxLength="100"
                                    />
                                </Form.Group>
                            </Form>
                            <span className="mx-1">{commentContent.length}/100</span>
                            <div className="ms-auto">
                                <Button
                                    type='submit'
                                    variant="success"
                                    className="p-1"
                                    disabled={isDisabled()}
                                >
                                    <RiSendPlane2Fill className="fs-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Existing Comments  */}
                        {comments.map((commentItem) => (
                            <Comment key={commentItem.commentId} {...commentItem} />
                        ))}

                    </div >
                ) : (
                    <span></span>
                )}
            </Card >
        </div >
    );
}


export default Post;