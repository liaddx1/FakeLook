import React from "react";
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../services/UserService';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLoginBtn from "../../components/FacebookLoginBtn";
import fontawesome from '@fortawesome/fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navigator from "../../components/Navigator";
import './LoginView.css';
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/actions/user";

const LogInView = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  //icons library
  fontawesome.library.add(faEnvelope, faKey);

  //validations
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

  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    if (formValidation(email, password)) {
      await UserService.LogIn({ email: email.value, password: password.value }).then(async (response) => {

        if (response.data.message) {
          setErrorMessage(response.data.message);
          return;
        }

        if (response.data.auth) {
          localStorage.setItem("authToken", response.data.authToken);
          localStorage.setItem('userId', response.data.userId);
          await UserService.getUserById(response.data.userId).then((response) => {
            localStorage.setItem('name', `${response.data.firstName} ${response.data.lastName}`);
            dispatch(setUser(response.data));
            navigate('/map');
          });
        }
      })
    }
  }

  return (
    <div>
      <Navigator />
      <Form className='login-form mt-5' onSubmit={handleSubmit}>
        <h2 className='text-center'>Log in</h2>

        <FacebookLoginBtn />
        <GoogleLoginBtn />

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

        <Button type='submit' color="primary" className='col-12'>Log in</Button>

        <div className='text-center mt-3'>
          <a href='/register'>Register</a>
          <span className='p-2'>|</span>
          <a href='/forgotPassword'>Forgot Passowrd</a>
        </div>

      </Form>
    </div>
  )
}

export default LogInView;