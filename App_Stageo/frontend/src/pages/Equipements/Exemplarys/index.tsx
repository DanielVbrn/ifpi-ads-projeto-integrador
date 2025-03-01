import React from "react"
import { Navbar,Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const HeaderReserve: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">STAGEO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Item as={Link} className="nav-link" to="/Home">Inicio</Nav.Item>
                    {/* <Nav.Item as={Link} className="nav-link" to="/Equipments">Equipamentos</Nav.Item> */}

                    <Nav.Link as={Link} className="nav-link" to="/Equipments">Equipamentos</Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
           
    </Navbar>
    )
}

export default HeaderReserve;