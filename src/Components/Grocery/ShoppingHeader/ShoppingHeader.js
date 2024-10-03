import React, { useState, useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ShoppingHeader.css';
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from '../Context/StoreContext';

import logo from './grocery-basket.png';

const ShoppingHeader = ({ setShowLogin }) => {

  const { cartItems} = useContext(StoreContext);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavLinkClick = (sectionId) => {
    navigate('/', { replace: true });
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShoppingCartClick = () => {
    navigate('/cart');
  };

  const totalCartItems = Object.values(cartItems).length;

  return (
    <>
      <header className="header-section">
        <nav className="shopping-bar">
          <div className="shopping-bar-container">
            {/* Brand */}
            <div className="brand" onClick={() => handleNavLinkClick('home')}>
              <img src={logo} alt="FlashFeast Logo" className="logo" />
              <span className="brand-name">FlashFeast</span>
            </div>

            {/* Toggle Button for Mobile */}
            <button className="toggle-button" onClick={toggleMenu} aria-label="Toggle navigation">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>

            {/* Navbar Links */}
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              {/* Search Bar */}
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search items"
                  className="search-input"
                  aria-label="Search"
                />
              </div>

              {/* Navigation Icons and Buttons */}
              <div className="nav-items">
                <button className="home-button" onClick={() => handleNavLinkClick('home')}>
                  🏠︎ HOME
                </button>
                <button className="login-button" onClick={() => setShowLogin(2)}>
                  <FaSignInAlt className="icon" /> LOGIN
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Fixed Cart Button */}
      <div className="fixed-cart-button">
        <button className="fixed-cart-icon" onClick={handleShoppingCartClick}>
          <ShoppingCart className='fixed-cart' />
          {totalCartItems > 0 && <div className='cart-count'>{totalCartItems}</div>}
        </button>
      </div>
    </>
  );
};

export default ShoppingHeader;
