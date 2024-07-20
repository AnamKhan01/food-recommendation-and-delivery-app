import React from 'react';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    return (
        <Navbar expand="lg" className='mt-3'>
            <Container>
                <Navbar.Brand href="#" className="navbar-brand">FlashFeast</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className='px-4'>Home</Nav.Link>
                        <Nav.Link href="#features" className='px-4'>Features</Nav.Link>
                        <Nav.Link href="#pricing" className='px-4'>Pricing</Nav.Link>
                        <Nav.Link href="#about" className='px-4'>About</Nav.Link>
                    </Nav>
                    <div className="auth-buttons">
                        <Button variant="outline-light" className="sign-in-btn"> <FaUserPlus className="me-2" />Sign In</Button>
                        <Button variant="warning" className="login-btn"><FaSignInAlt className="me-2" />Login</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
