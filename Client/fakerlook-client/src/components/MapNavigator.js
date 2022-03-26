import React from 'react';
import { Container, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import './MapNavigator.css';
import Locate from './Locate';
import Search from './Search';


const MapNavigator = props => {
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
              <NavDropdown.Item href="#action3">Update Profile Picture</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => props.logOut()}>
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