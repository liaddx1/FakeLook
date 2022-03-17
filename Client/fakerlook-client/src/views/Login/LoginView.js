import React from "react";
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import UserService from '../../services/ServicesFolder/UserService';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginView.css';

const LogInView = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  fontawesome.library.add(faEnvelope, faKey);

  const formValidation = (email, password) => {
    if (email.value.trim().length === 0) {
      setErrorMessage('Email Cannot Be Empty!');
      return false;
    }
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value))) {
      setErrorMessage('Invalid Email Address!');
      return false;
    }
    if (password.value.trim().length === 0) {
      setErrorMessage('Password Cannot Be Empty!');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    if (formValidation(email, password)) {
      const response = await UserService.LogIn({ email: email.value, password: password.value });

      if (response.data.message)
        setErrorMessage(response.data.message);
      console.log(response.data);

      if (!response.data.message)
        navigate('/map');

    }
  }

  return (
    <div>
      <h1>FakeLook</h1>
      <Form className='login-form' onSubmit={handleSubmit}>
        <h2 className='text-center'>Log in</h2>

        <FacebookLoginButton className='mt-3 mb-3' />
        <GoogleLoginButton className='mt-3 mb-3' />

        <p className="divider-text">
          <span className="bg-white">OR</span>
        </p>

        <FormGroup>
          <InputGroup >
            <InputGroupText className='col-3'>
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp;Email
            </InputGroupText>
            <Input id="email" type="text" placeholder="Enter Your Email" className="form-control" />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup >
            <InputGroupText className='col-3'>
              <FontAwesomeIcon icon={faKey} />
              &nbsp;Passowrd
            </InputGroupText>
            <Input id='password' type='password' placeholder='Enter your password' />
          </InputGroup>
        </FormGroup>

        {errorMessage.trim().length !== 0 && <div className='text-center alert alert-danger'>{errorMessage}</div>}

        <Button type='submit' className='btn btn-primary col-12'>Log in</Button>

        <div className='text-center mt-3'>
          <a href='/register'>Register</a>
          <span className='p-2'>|</span>
          <a href='/register'>Forgot Passowrd</a>
        </div>

      </Form>
    </div >
  )
}

export default LogInView;