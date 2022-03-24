import React, { useEffect } from "react";
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import UserService from '../../services/ServicesFolder/UserService';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navigator from "../../components/Navigator";
import './LoginView.css';

const LogInView = (props) => {
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
      const response = await UserService.LogIn({ email: email.value, password: password.value });

      if (response.data.message)
        setErrorMessage(response.data.message);
      console.log(response.data);

      if (response.data.auth) {
        localStorage.setItem("authToken", response.data.authToken);

        navigate('/map');
      }

    }
  }

  const responseGoogle = (response) => {
    console.log(response);
    if (response.tokenObj.id_token) {
      const pic = response.profileObj.imageUrl;
      const email = response.profileObj.email;
      const firstName = response.profileObj.givenName;
      const lastName = response.profileObj.familyName;
      const name = [firstName, lastName].join(' ');
      localStorage.clear();
      localStorage.setItem("name", name);
      localStorage.setItem("authToken", response.tokenId);
      navigate('/map');
    }
  }

  const responseFacebook = (response) => {
    if (response.accessToken) {
      const pic = response.picture;
      const email = response.email;
      const name = response.name;
      localStorage.clear();
      localStorage.setItem("name", name);
      localStorage.setItem('facebookExp', response.data_access_expiration_time);
      navigate('/map');
    }
  }

  //side effects
  useEffect(() => {
  }, []);

  return (
    <div>
      <Navigator />
      <Form className='login-form mt-5' onSubmit={handleSubmit}>
        <h2 className='text-center'>Log in</h2>

        <FacebookLogin
          className='mt-3 mb-3'
          appId={process.env.REACT_APP_LOGIN_FACEBOOK_APP_ID}
          fields="name,email,picture"
          render={renderProps => (<FacebookLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Log In With Facebook</FacebookLoginButton>)}
          onClick={responseFacebook}
          callback={responseFacebook}
        />

        <GoogleLogin
          className='mt-3 mb-3'
          clientId={process.env.REACT_APP_LOGIN_GOOGLE_CLIENT_ID}
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
          <a href='/forgotPassword'>Forgot Passowrd</a>
        </div>

      </Form>
    </div>
  )
}

export default LogInView;