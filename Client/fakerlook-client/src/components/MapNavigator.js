import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";

const MapNavigator = props => {

  return (
    <Navbar bg="dark" variant='dark' fixed='top' expand="lg">
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
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MapNavigator;