import React from 'react'
// bootstrap 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// router 
import { Link } from "react-router-dom";

function NavButtons(props) {
  function handleLogout(){
    props.setAuthToken(null)
    localStorage.removeItem("authtoken");
  }
  if (props.authToken === null) {
    return (
      <>
        <Link to="/sign_up" >
          <Button variant="outline-success" className='mx-1'>Sign up</Button>
        </Link>
        <Link to="/sign_in">
          <Button variant="outline-success" className='mx-1'>Login</Button>
        </Link>
      </>
    )
  } else {
    return (
      <>
      <Link >
          <Button variant="outline-success" className='mx-1' onClick={handleLogout}>Logout</Button>
      </Link>
      </>
    )
  }
}

function Nav_bar(props) {
  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand>Qviv-Links</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/edit">Edit</Nav.Link>
              <Nav.Link as={Link} to="/view">Preview</Nav.Link>
            </Nav>
            <div>
              <NavButtons authToken={props.authToken} setAuthToken={props.setAuthToken} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Nav_bar