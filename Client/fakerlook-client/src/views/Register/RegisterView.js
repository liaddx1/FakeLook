import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, InputGroup, InputGroupText, Button } from "reactstrap";
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEnvelope, faHome, faLock, faUserAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';
import './RegisterView.css';
import UserService from "../../services/ServicesFolder/UserService";
import User from "../../models/UserModel";

const RegisterView = props => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    fontawesome.library.add(faEnvelope, faLock, faCalendar, faHome, faUserAlt, faUserMd);

    const formValidation = (password, repeatedPassword) => {

        if (repeatedPassword.trim().length === 0) {
            setErrorMessage('Please Repeat Password!');
            return false;
        }
        if (password !== repeatedPassword) {
            setErrorMessage('Passwords Do Not Match!');
            return false;
        }

        setErrorMessage('');
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, address, birthDate, job, password, repeatedPassword } = e.target.elements;

        const newUser = new User(firstName.value, lastName.value, email.value, address.value, birthDate.value, job.value, password.value);
        const [value, message] = newUser.validate();
        setErrorMessage(message);

        if (value && formValidation(password.value, repeatedPassword.value)) {
            const response = await UserService.Register(newUser);
            if (response.data.auth) {
                localStorage.setItem("authToken", response.data.authToken);
            }
            navigate('/login');
        }
    }
    return (
        <div>
            <h1>FakeLook</h1>
            <Form className="register-form" onSubmit={handleSubmit}>
                <h2 className='card-title mt-3 text-center'>Create Account</h2>
                <p className="text-center">Get Started With FakeLook Today!</p>

                <FacebookLoginButton className='mt-3 mb-3' />
                <GoogleLoginButton className='mt-3 mb-3' />

                <p className="divider-text">
                    <span className="bg-white">OR</span>
                </p>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faUserAlt} />
                            &nbsp;Name
                        </InputGroupText>
                        <Input id="firstName" type="text" placeholder="First Name" className="form-control" />
                        <Input id="lastName" type="text" placeholder="Last Name" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            &nbsp;Email
                        </InputGroupText>
                        <Input id="email" type="text" placeholder="Email Address" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faHome} />
                            &nbsp;Address
                        </InputGroupText>
                        <Input id="address" type="text" placeholder="Home Address" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faCalendar} />
                            &nbsp;Birth Date
                        </InputGroupText>
                        <Input id="birthDate" type="date" placeholder="Birth Date" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faUserMd} />
                            &nbsp;Job
                        </InputGroupText>
                        <Input id="job" type="text" placeholder="Job" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;Password
                        </InputGroupText>
                        <Input id="password" type="password" placeholder="Create Password" className="form-control" />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText className='col-3'>
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;Repeat
                        </InputGroupText>
                        <Input id="repeatedPassword" type="password" placeholder="Repeat Passowrd" className="form-control" />
                    </InputGroup>
                </FormGroup>
                {errorMessage.trim().length !== 0 && <div className='text-center alert alert-danger'>{errorMessage}</div>}
                <Button type='submit' className='btn col-12'>Create Account</Button>

                <p className="text-center">
                    Already Have An Account? <a href="/login">Log In</a>
                </p>
            </Form>
        </div>
    )
}

export default RegisterView;