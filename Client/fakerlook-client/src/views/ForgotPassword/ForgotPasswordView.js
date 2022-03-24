import React, { useEffect } from "react";
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import GoogleLogin from "react-google-login";
import UserService from '../../services/ServicesFolder/UserService';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './ForgotPasswordView.css';

const ForgotPasswordView = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  //icons library
  fontawesome.library.add(faEnvelope, faKey);

  //validations
  const formValidation = (email, password, repeatedPassword) => {
    if (email.value.trim().length === 0) {
      setErrorMessage('Email Cannot Be Empty!');
      return false;
    }
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value))) {
      setErrorMessage('Invalid Email Address!');
      return false;
    }
    debugger;
    if (password.value.trim().length === 0) {
      setErrorMessage('Password Cannot Be Empty!');
      return false;
    }
    if (repeatedPassword.value.trim().length === 0) {
        setErrorMessage('Please Repeat Password!');
        return false;
    }
    if (password.value !== repeatedPassword.value) {
        setErrorMessage('Passwords Do Not Match!');
        return false;
    }

    setErrorMessage('');
    return true;

  }

  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, repeatedPassword } = e.target.elements;
    if (formValidation(email, password, repeatedPassword)) {
        await UserService.getUserByEmail(email)
            .then(async (user) => {
                const result = await UserService.changePassword(user);
                return result;
            }).catch((err) => {
                setErrorMessage(err)
            })

    }
                
    // if (value && formValidation(password.value, repeatedPassword.value)) {
    //     const response = await UserService.Register(newUser);

    //     if (response.data.auth) {
    //         localStorage.setItem("authToken", response.data.authToken);
    //         navigate('/login');
    //     }
    // }
}


  const responseGoogle = (response) => {
    // console.log(response);

    // const pic = response.profileObj.imageUrl;
    // const email = response.profileObj.email;
    // const firstName = response.profileObj.name;
    // const lastName = response.profileObj.familyName;
    localStorage.setItem("authToken", response.tokenObj.id_token);
    // localStorage.setItem(response.tokenObj.token_type, response.tokenObj.id_token);
    console.log(response);
  }

  return (
    <div>
      <h1>FakeLook</h1>
      <Form className='login-form' onSubmit={handleSubmit}>
        <h2 className='text-center'>Forgot Password</h2>

        <FacebookLoginButton id="facebookLoginButton" className='mt-3 mb-3' />
        <GoogleLogin
          className='mt-3 mb-3'
          clientId='831225005582-6pqgsdml92hthg0bhf15f71dp0vknav5.apps.googleusercontent.com'
          render={renderProps => (<GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} >Log In with Google</GoogleLoginButton>)}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />

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
            <InputGroupText className='col-5'>
              <FontAwesomeIcon icon={faKey} />
              &nbsp;New Password
            </InputGroupText>
            <Input id='password' type='password' placeholder='Enter your password' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup >
            <InputGroupText className='col-5'>
              <FontAwesomeIcon icon={faKey} />
              &nbsp;New Password Again
            </InputGroupText>
            <Input id='repeatedPassword' type='password' placeholder='Repeat your password' />
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

export default ForgotPasswordView;