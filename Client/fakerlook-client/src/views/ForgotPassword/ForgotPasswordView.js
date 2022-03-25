import React, { useEffect } from "react";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../services/ServicesFolder/UserService";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigator from "../../components/Navigator";
import User from '../../models/UserModel'
import "./ForgotPasswordView.css";

const ForgotPasswordView = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //icons library
  fontawesome.library.add(faEnvelope, faKey);

  //validations
  const formValidation = (email, password, repeatedPassword) => {
    if (email.value.trim().length === 0) {
      setErrorMessage("Email Cannot Be Empty!");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value)) {
      setErrorMessage("Invalid Email Address!");
      return false;
    }
    if (password.value.trim().length === 0) {
      setErrorMessage("Password Cannot Be Empty!");
      return false;
    }
    if (password.value !== repeatedPassword.value) {
      setErrorMessage("Passwords Do Not Match!");
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
          if (response.message) setErrorMessage(response.message);
          //will be problematic if the response if empty or wrong
          return response;
        })
        .then(async (user) => {
            const firstName = user[0].firstName;
            const lastName = user[0].lastName;
            const email = user[0].email;
            const address = user[0].address;
            const birthDate = user[0].birthDate;
            const job = user[0].job;
            const newPassword = repeatedPassword.value;
            debugger;
            const newUser = new User(firstName, lastName, email, address, 
                birthDate , job, newPassword);
            newUser.userId = user[0].userId
          const result = await UserService.changePassword({ user: newUser });
          return result;
        })
        .then(() => setSuccessMessage("Password changed successfully."))
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  //side effects
  useEffect(() => {}, []);

  return (
    <div>
      <Navigator />
      <Form className="login-form mt-5" onSubmit={handleSubmit}>
        <h2 className="text-center">Forgot Password</h2>

        <p className="divider-text">
          <span className="bg-white">Change Password:</span>
        </p>

        <FormGroup>
          <InputGroup>
            <InputGroupText className="col-3">
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
              placeholder="Enter your password"
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
              placeholder="Repeat your password"
            />
          </InputGroup>
        </FormGroup>

        {errorMessage.trim().length !== 0 && (
          <div className="text-center alert alert-danger">{errorMessage}</div>
        )}
        {successMessage.trim().length !== 0 && (
          <div className="text-center alert alert-success">
            {successMessage}
            <p>
              <a href="/login">Back to login</a>
            </p>
          </div>
        )}

        <Button type="submit" className="btn btn-primary col-12">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPasswordView;
