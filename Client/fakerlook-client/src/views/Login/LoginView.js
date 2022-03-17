import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton, LinkedInLoginButton } from 'react-social-login-buttons';
import './LoginView.css';

const LogInView = (props) => {

  return (
    <div>
      <h1>FakeLook</h1>
      <Form className='login-form'>
        <h2 className='text-center'>Log in</h2>
        <FacebookLoginButton className='mt-3 mb-3' />
        <GoogleLoginButton className='mt-3 mb-3' />
        <LinkedInLoginButton className='mt-3 mb-3' />

        <p class="divider-text">
          <span class="bg-white">OR</span>
        </p>

        <FormGroup>
          <Label>Email</Label>
          <Input type='email' placeholder='Enter your Email' />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type='password' placeholder='Enter your password' />
        </FormGroup>
        <Button className='btn-lg btn-dark btn-block'>Log in</Button>
        <div className='text-center mt-3'>
          <a href='/register'>Register</a>
          <span className='p-2'>|</span>
          <a href='/register'>Forgot Passowrd</a>
        </div>
      </Form>
    </div>
  )
}

export default LogInView;