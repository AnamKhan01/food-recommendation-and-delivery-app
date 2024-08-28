// Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isFixed = true }) => {
  const navigate = useNavigate();

  const handleNavLinkClick = (sectionId) => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

  return (
    <Navbar className={isFixed ? 'navbar fixed' : 'navbar static'}>
      <div className='navbar-container'>
        <Navbar.Brand href="#" className="navbar-brand">♨️FlashFeast</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className='mx-4 px-3 header-links' onClick={() => handleNavLinkClick('home')}>Home</Nav.Link>
            <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('features')}>Features</Nav.Link>
            <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('shopping')}>Shopping</Nav.Link>
            <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('contact')}>Contact</Nav.Link>
            <Nav.Link href="#about" className='mx-4 px-3 header-links'><BsCart4 className='icon' /></Nav.Link>
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
