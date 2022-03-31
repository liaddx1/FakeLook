import React, { useState } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, InputGroupText, FormGroup, InputGroup, Button } from 'reactstrap';
import PostOutput from "../../models/PostOutputModel";
import { useDispatch } from 'react-redux';
import { addPost } from '../../Store/actions/post';
import PostService from '../../services/PostService';
import './AddPostView.css';

const AddPost = props => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');


    fontawesome.library.add(faFile, faEnvelopeOpenText);

    const submitHandler = async (e) => {
        e.preventDefault();
        const { picture, description } = e.target.elements;

        if (!(picture.files[0] && picture.files[0]['type'].split('/')[0] === 'image')) {
            setErrorMessage('File Uploaded Is Not a Picture!');
            return;
        }

        if (!props.location) {
            setErrorMessage("Please Choose Post Location!");
            return;
        }
        
        const newPost = new PostOutput(localStorage.getItem('userId'), description.value, imagePreview, props.location.lat, props.location.long);

        const [value, message] = newPost.validate();

        setErrorMessage(message);

        if (value) {
            await PostService.addPost(newPost).then(async (response) => {
                if (response.recordset[0].postId >= 0) {
                    await PostService.getPost(response.recordset[0].postId).then(async (response) => {
                        dispatch(addPost(response[0]));
                        props.onChangePage(0);
                    })
                }
            });
        }

    }

    const handleImagePreview = async (e) => {
        const pic = await getBase64(e.target.files[0]);
        setImagePreview(pic);
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    return (
        <div className='text-center'>
            <h1>Create New Post</h1>
            <p className="divider-text"></p>
            <Form className="post-form" onSubmit={submitHandler}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faFile} />
                            &nbsp;Picture
                        </InputGroupText>
                        <Input id="picture" type="file" className="form-control" onChange={handleImagePreview} />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} />
                            &nbsp;Description
                        </InputGroupText>
                        <Input id="description" placeholder='Enter Post Description...' type="textarea" className="form-control" />
                    </InputGroup>
                </FormGroup>

                {errorMessage.trim().length !== 0 && <div className='text-center alert alert-danger'>{errorMessage}</div>}

                <div className="d-grid gap-2 mt-2">
                    <Button color='danger' type='button' className='col-12 mt-2' onClick={() => props.onChangePage(0)}>Change Post Location</Button>

                    <Button color='primary' type='submit' className='btn col-12'>Publish Post</Button>

                    <Button className='col-12' type='button' onClick={() => props.onChangePage(0)}>Cancel</Button>
                </div>

                {imagePreview &&
                    <div className='mt-3'>
                        <h3>Image Preview:</h3>
                        <img height={"400px"} src={imagePreview} alt="Preview" />
                    </div>}

            </Form>
        </div>
    );
}

export default AddPost;