import React from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";

const Navigator = props => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
            <Nav.Link href="/Map">Map</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
            {/* <Nav.Link href="/ForgotPassword">Forgot Passowrd</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigator;