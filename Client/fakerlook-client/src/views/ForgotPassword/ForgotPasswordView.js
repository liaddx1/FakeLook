import React, { useState } from "react";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../services/UserService";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import Navigator from "../../components/Navigator";
import "./ForgotPasswordView.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Store/actions/user";

const ForgotPasswordView = (props) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //icons library
  fontawesome.library.add(faEnvelope, faKey);

  //validations
  const formValidation = (email, password, repeatedPassword) => {
    if (email.value.trim().length === 0) {
      setErrorMessage("Email Cannot Be Empty!");
      setSuccessMessage("");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value)) {
      setErrorMessage("Invalid Email Address!");
      setSuccessMessage("");
      return false;
    }
    if (password.value.trim().length === 0) {
      setErrorMessage("Password Cannot Be Empty!");
      setSuccessMessage("");
      return false;
    }
    if (password.value !== repeatedPassword.value) {
      setErrorMessage("Passwords Do Not Match!");
      setSuccessMessage("");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, repeatedPassword } = e.target.elements;

    if (formValidation(email, password, repeatedPassword)) {
      await UserService.getUserByEmail(email.value)
        .then((response) => {
          if (response.message) {
            setSuccessMessage('');
            setErrorMessage(response.message);
          }
          return response;
        })
        .then(async (user) => {
          user[0].password = repeatedPassword.value;
          dispatch(updateUser(user[0]));
          return await UserService.changePassword({ user: user[0] });
        })
        .then(() => {
          setSuccessMessage("Password Changed Successfully.");
          setErrorMessage('');
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setSuccessMessage('');
        });
    }
  };

  return (
    <div>
      <Navigator />
      <Form className="login-form mt-5" onSubmit={handleSubmit}>
        <h2 className="text-center">Forgot Password</h2>

        <p className="divider-text">
          <span className="bg-white">Change Password</span>
        </p>

        <FormGroup>
          <InputGroup>
            <InputGroupText className="col-5">
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp;Email
            </InputGroupText>
            <Input
              id="email"
              type="text"
              placeholder="Enter Your Email"
              className="form-control"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <InputGroupText className="col-5">
              <FontAwesomeIcon icon={faKey} />
              &nbsp;New Password
            </InputGroupText>
            <Input
              id="password"
              type="password"
              placeholder="Enter Your Password"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <InputGroupText className="col-5">
              <FontAwesomeIcon icon={faKey} />
              &nbsp;Repeat Password
            </InputGroupText>
            <Input
              id="repeatedPassword"
              type="password"
              placeholder="Repeat Your Password"
            />
          </InputGroup>
        </FormGroup>


        {errorMessage.trim().length !== 0 && (<div className="text-center alert alert-danger">{errorMessage}</div>)}
        {successMessage.trim().length !== 0 && (<div className="text-center alert alert-success">{successMessage}</div>)}

        <Button type="submit" color="primary" className="col-12">Submit</Button>

        <div className='text-center mt-3'>
          <a href='/login'>Login</a>
          <span className='p-2'>|</span>
          <a href='/register'>Register</a>
        </div>

      </Form>
    </div>
  );
};

export default ForgotPasswordView;
