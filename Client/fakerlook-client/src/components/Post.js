import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RiHeartFill, RiHeartLine, RiMessage2Fill, RiSendPlane2Fill, } from "react-icons/ri";
import { formatRelative } from "date-fns";
import PostLikeService from '../services/PostLikesService';
import './Post.css'

const Post = props => {
    const user = useSelector(state => state.users.users).find(u => u.userId === props.userId);
    const [commentStatus, setCommentStatus] = useState(false);
    const [likeStatus, setLikeStatus] = useState(props.liked);
    const [likesCounter, setLikesCounter] = useState(props.postLikeAmount);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCommentButtonClick = () => {
        setCommentStatus(!commentStatus);
    }

    const handleLoveButtonClick = useCallback(async () => {
        console.log(props.liked);
        console.log(likeStatus);
        if(likeStatus){
            await PostLikeService.removeLike(props.postId, localStorage.getItem("userId")).then((response) => {
                if(response.message){
                    setErrorMessage(response.message);
                    return;
                }
                console.log(response);
                setLikeStatus(!likeStatus);
                setLikesCounter(previous => { return previous - 1 })
            });
            return;
        }       

        await PostLikeService.addLike(props.postId, localStorage.getItem("userId")).then((response) => {
            if(response.message){
                setErrorMessage(response.message);
                return;
            }
            setLikeStatus(!likeStatus);
            setLikesCounter(previous => { return previous + 1 });
        });

    }, [likeStatus, props.postId, props.liked])

    useEffect(() => {
        setLikeStatus(props.liked);
    },[props.liked])
    useEffect(() => {
        setTimeout(() => { setErrorMessage(''); }, 5000);
    }, [setErrorMessage])

    return (
        <div key={Math.random().toString()} className="shadow rounded-3 border-primary p-3 mt-3" >
            {console.log(props)}
            <Card className="border-0">
                <div className="d-flex align-items-center mb-3">
                    <div className="mx-3">
                        <img className="rounded-pill" src={user.picture} height="50px" alt="profile" />
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
                        onClick={handleLoveButtonClick} // add like
                        >
                            {props.liked ? (
                                <RiHeartFill className="text-danger" />
                            ) : (
                                <RiHeartLine className="text-danger" />
                            )}
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
                            {/* {props.commentList.length > 0 ? props.commentList.length : null} */}2 {/** Number of Comments */}
                        </span>
                    </div>

                </div>

                {errorMessage.trim().length !== 0 && <div className='text-center mt-3 alert alert-danger'>{errorMessage}</div>}

                {/* List of comments and comment input box */}
                {commentStatus ? (
                    <div className="mt-3">
                        <div className="d-flex align-items-center">
                            <Form className="w-100 mx-1">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write a comment..."
                                    // value={commentContent}
                                    // onChange={handleCommentContentChange}
                                    />
                                </Form.Group>
                            </Form>
                            <span className="mx-1">/100</span> {/*{commentContent.length} */}
                            <div className="ms-auto">
                                <Button
                                    variant="success"
                                    className="p-1"
                                // disabled={sendButtonDisable}
                                // onClick={sendComment}
                                >
                                    <RiSendPlane2Fill className="fs-4" />
                                </Button>
                            </div>
                        </div>
                        {/* Existing Comments  */}
                        {/* <Hashicon value={commentItem.userId} size={30} />{" "} */}
                        {/* {props.commentList.map((commentItem) => (
                            <div className="border rounded border-info my-3 px-2 pb-2">
                                <div className="d-flex align-items-center my-2">
                                    <div className="me-auto mx-1">
                                        icon here
                                    </div>
                                    <div className="w-100 mx-1 fw-bold">
                                        <span>{commentItem.userFullname}</span>
                                    </div>
                                </div>
                                <div>{commentItem.content}</div>
                            </div >
                        ))} */}

                    </div >
                ) : (
                    <span></span>
                )}
            </Card >
        </div >
    );
}
export default Post;