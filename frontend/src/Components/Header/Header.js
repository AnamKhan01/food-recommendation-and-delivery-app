import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import hotpot from '../../images/hot-pot.png';
import { StoreContext } from "../Grocery/Context/StoreContext";
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";

const Header = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [navCollapsed, setNavCollapsed] = useState(true);

  const { token, settoken, username, setUsername } = useContext(StoreContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  const handleNavLinkClick = (sectionId) => {
    setNavCollapsed(true);
    if (sectionId === 'home') {

      navigate('/');
      window.scrollTo(0, 0);
    } else {

      navigate('/', { replace: true });
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'instant' });
        }
      }, 100);
    }
  };

  const handleCartClick = () => {
    navigate('/grocery-home');
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    settoken("");
    setUsername("");
    navigate("/");
  }

  return (
    <>
      <Navbar className="main-navbar">
        <div className='navbar-container'>
          <Navbar.Brand href="#" className="navbar-brand" onClick={() => navigate('/')}>
            <img src={hotpot} alt='' className='hotPot'></img>FlashFeast
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="navbar-toggler"
            onClick={() => setNavCollapsed(!navCollapsed)}
          />
          <Navbar.Collapse 
            id="basic-navbar-nav" 
            className={navCollapsed ? 'collapse' : 'navbar-collapse show'}
          >
            <Nav className="mx-4">
              <Nav.Link className='mx-4 px-3 header-links' onClick={() => handleNavLinkClick('home')}>Home</Nav.Link>
              <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('features')}>Features</Nav.Link>
              <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('shopping')}>Shopping</Nav.Link>
              <Nav.Link className='mx-5 px-3 header-links' onClick={() => handleNavLinkClick('contact')}>Contact</Nav.Link>
              <Nav.Link className='mx-4 px-3 header-links nav-cart' onClick={handleCartClick}><ShoppingCart className='icon' /></Nav.Link>
            </Nav>
            {!token
              ?
              <div className="auth-buttons">
                <Button variant="outline-light" className="sign-in-btn" onClick={() => setShowLogin(1)}> <FaUserPlus className="me-2" />SIGN-IN</Button>
                <Button variant="warning" className="login-btn" onClick={() => setShowLogin(2)}><FaSignInAlt className="me-2" />LOGIN</Button>
              </div>
              :
              <div className="navbar-profile">
                <p className='profile-name'>{username}<FaUserCircle className='profile-image' /></p>
                <ul className='nav-profile-dropdown'>
                  <li onClick={()=>navigate('/myOrders')}><HiShoppingBag /><p>Your Orders</p></li>
                  <li onClick={logOut}><VscSignOut /> <p>Logout</p></li>
                </ul>
              </div>
            }
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;