import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RecipeHeader.css';
import hotpot from '../../images/hot-pot.png';

const RecipeHeader = ({setShowLogin}) => {
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
    <Navbar className='custom-navbar'>
      <div className='custom-navbar-container'>
        <Navbar.Brand href="#" className="custom-navbar-brand">
          <img src={hotpot} alt='' className='custom-hotpot-icon'></img>FlashFeast
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-custom-nav" />
        <Navbar.Collapse id="basic-navbar-custom-nav">
          <Nav className="custom-nav">
            <Nav.Link className='custom-nav-link' onClick={() => handleNavLinkClick('home')}>Home</Nav.Link>
            <Nav.Link className='custom-nav-link' onClick={() => handleNavLinkClick('features')}>Features</Nav.Link>
            <Nav.Link className='custom-nav-link' onClick={() => handleNavLinkClick('shopping')}>Shopping</Nav.Link>
            <Nav.Link className='custom-nav-link' onClick={() => handleNavLinkClick('contact')}>Contact</Nav.Link>
            <Nav.Link href="#about" className='custom-nav-cart'>
              <ShoppingCart className='custom-icon' />
            </Nav.Link>
          </Nav>
          <div className="custom-auth-buttons">
            <Button variant="outline-light" className="custom-sign-in-btn" onClick={() => setShowLogin(1)}> 
              <FaUserPlus className="me-2" />SIGN-IN
            </Button>
            <Button variant="warning" className="custom-login-btn" onClick={() => setShowLogin(2)}>
              <FaSignInAlt className="me-2" />LOGIN
            </Button>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default RecipeHeader;
