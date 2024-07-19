import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './Images/logo.png';

const Header = () => {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <img src={logo} alt='Logo' className="logo"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className='px-4'>Home</Nav.Link>
                        <Nav.Link href="#features" className='px-4'>Features</Nav.Link>
                        <Nav.Link href="#pricing" className='px-4'>Pricing</Nav.Link>
                        <Nav.Link href="#about" className='px-4'>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
