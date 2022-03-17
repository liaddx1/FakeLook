import { FacebookLoginButton, GoogleLoginButton, LinkedInLoginButton } from 'react-social-login-buttons';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import './LoginView.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/ServicesFolder/UserService';
import axios from 'axios';

const LogInView = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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
      console.log('Logging in..');
      const response = await  UserService.LogIn( { email: email.value, password: password.value });
      console.log(response.data);
      // navigate('/map');
    }
  }

  return (
    <div>
      <h1>FakeLook</h1>
      <Form className='login-form' onSubmit={handleSubmit}>
        <h2 className='text-center'>Log in</h2>

        <FacebookLoginButton className='mt-3 mb-3' />
        <GoogleLoginButton className='mt-3 mb-3' />
        <LinkedInLoginButton className='mt-3 mb-3' />

        <p className="divider-text">
          <span className="bg-white">OR</span>
        </p>

        <FormGroup>
          <Label>Email</Label>
          <Input id="email" type="text" placeholder='Enter your Email' />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input id='password' type='password' placeholder='Enter your password' />
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