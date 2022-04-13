import React, { useEffect, useCallback } from 'react';
import { Container, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import Locate from './Locate';
import Search from './Search';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './MapNavigator.css';

const MapNavigator = props => {
  const navigate = useNavigate();

  const isAuthorazied = useCallback(() => {
    const token = localStorage.getItem("authToken");
    const facebookExp = localStorage.getItem('facebookExp');
    if (!token && !facebookExp) {
      navigate('/login');
      return;
    }

    let currentDate = new Date();
    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken) {
        //// console.log(decodedToken.exp * 1000, "<", currentDate.getTime());
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          localStorage.clear();
          navigate('/login');
        }
      }
    }

    if (facebookExp) {
      if (facebookExp * 1000 < currentDate.getTime()) {
        localStorage.clear();
        navigate('/login');
      }
    }

  }, [navigate]);  

   //side effects
   useEffect(() => {
    isAuthorazied();
}, [isAuthorazied])

useEffect(() => {
  setInterval(() => {
    isAuthorazied();
  }, 60000);
}, [isAuthorazied])
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">FakeLook</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#" disabled><span className="link-primary">{localStorage.getItem('name')}</span></Nav.Link>
            <NavDropdown title="Options" id="navbarScrollingDropdown">
              <NavDropdown.Item className='text-center' href="#action3">Update Profile Picture</NavDropdown.Item>
              <NavDropdown.Item className='text-center' href="#action4">Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='text-center' onClick={() => props.logOut()}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <div>
              <Locate updateLocation={props.updateLocation} />
            </div>

            <div className='search form-control'>
              <Search updateLocation={props.updateLocation} />
            </div>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
export default MapNavigator;