import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
import './Header.css';

const Header = () => {
    return (
        <Navbar>
            <div className='navbar-container'>
                <Navbar.Brand href="#" className="navbar-brand">FlashFeast🔥</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className='px-5'>Home</Nav.Link>
                        <Nav.Link href="#features" className='px-5'>Features</Nav.Link>
                        <Nav.Link href="#shopping" className='px-5'>Shopping</Nav.Link>
                        <Nav.Link href="#contact" className='px-5'>Contact</Nav.Link>
                        <Nav.Link href="#about" className='px-5'><BsCart4 className='icon' /></Nav.Link>
                    </Nav>
                    <div className="auth-buttons">
                        <Button variant="outline-light" className="sign-in-btn"> <FaUserPlus className="me-2" />SIGN-IN</Button>
                        <Button variant="warning" className="login-btn"><FaSignInAlt className="me-2" />LOGIN</Button>
                    </div>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;
