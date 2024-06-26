import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Rumbao</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/bdc">BDC</Nav.Link>
          <Nav.Link href="/posventa">POSVENTA</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
