import React, { useState } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, InputGroupText, FormGroup, InputGroup, Button } from 'reactstrap';
import './AddPostView.css';

const AddPost = props => {
    const [errorMessage, setErrorMessage] = useState('');

    fontawesome.library.add(faFile, faEnvelopeOpenText);

    const submitHandler = () => {

    }

    return (
        <div className='text-center'>
            <h1>Create New Post</h1>

            <p className="divider-text"></p>
            <Form className="post-form ">
                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faFile} />
                            &nbsp;Picture
                        </InputGroupText>
                        <Input id="picture" type="file" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} />
                            &nbsp;Post Description
                        </InputGroupText>
                        <Input id="description" placeholder='Enter Post Description...' type="textarea" className="form-control" />
                    </InputGroup>
                </FormGroup>
                
                <div className="d-grid gap-2 mt-2">
                    <Button className='btn col-12 mt-2' onAbort={() => props.onChangePage(0)}>Change Post Location</Button>

                    <Button type='submit' className='btn col-12' onSubmit={submitHandler}>Publish Post</Button>

                    <Button className='btn col-12' onAbort={() => props.onChangePage(0)}>Cancel</Button>
                </div>
            </Form>
        </div >
    );
}

export default AddPost;