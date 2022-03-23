import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, } from "@reach/combobox";
import './MapNavigator.css';


const MapNavigator = props => {
  const [searchString, setSearchString] = useState('');

  const onSearchChanged = (e) => setSearchString(e.target.value);

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
            <div className='search center-text'>
              <Search />
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MapNavigator;

const Search = (props) => {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 31.726870, lng: () => 34.992470, },
      radius: 100 * 1000,

    },
  });

  return (
    <Combobox onSelect={async (address) => {
      try {
        const results = await getGeocode({ address });
        console.log(results[0]);
      } catch (error) {
        console.log('Error!');
      }
    }}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter An Address"
        className='center-text'
      />
      <ComboboxPopover className='mt-2'>
        {status === "OK" && data.map(({ id, description }) => (<ComboboxOption key={Math.random().toString()} value={description} />))}
      </ComboboxPopover>

    </Combobox>
  );
}