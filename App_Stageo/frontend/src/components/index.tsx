import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

// interface HeaderProps {
//   isLoggedIn: boolean; // Indica se o usuário está logado ou não
// }

const Header: React.FC/* <HeaderProps> */ = (/* { isLoggedIn } */) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">STAGEO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* {isLoggedIn && ( */}
            <Nav.Item as={Link} className="nav-link" to="/Home">
              Inicio
            </Nav.Item>
          {/* )} */}
          {/* {isLoggedIn && ( */}
            <Nav.Link as={Link} className="nav-link" to="/Equipments">
              Equipamentos
            </Nav.Link>
          {/* )} */}
        </Nav>
        <Nav>
          <Nav.Link as={Link} className="bt-logout" to="/">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
