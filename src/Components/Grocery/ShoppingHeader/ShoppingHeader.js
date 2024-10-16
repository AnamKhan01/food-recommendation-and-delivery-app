import React, { useState, useContext, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ShoppingHeader.css';
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from '../Context/StoreContext';
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import logo from './grocery-basket.png';

const ShoppingHeader = ({ setShowLogin }) => {

  const { cartItems } = useContext(StoreContext);

  const { token, settoken, username, setUsername } = useContext(StoreContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    settoken("");
    setUsername("");
    navigate("/");
  }

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

  const totalCartItems = Object.values(cartItems).filter(quantity => quantity > 0).length;

  return (
    <>
      <header className="header-section">
        <nav className="shopping-bar">
          <div className="shopping-bar-container">

            <div className="brand" onClick={() => handleNavLinkClick('home')}>
              <img src={logo} alt="FlashFeast Logo" className="logo" />
              <span className="brand-name">FlashFeast</span>
            </div>

            <button className="toggle-button" onClick={toggleMenu} aria-label="Toggle navigation">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>

              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search items"
                  className="search-input"
                  aria-label="Search"
                />
              </div>

              <div className="nav-items">
                <button className="home-button" onClick={() => handleNavLinkClick('home')}>
                  🏠︎ HOME
                </button>
                {!token
                  ?
                  <button className="login-button" onClick={() => setShowLogin(2)}>
                    <FaSignInAlt className="icon" /> LOGIN
                  </button>
                  :
                  <div className="shop-navbar-profile">
                    <p className='shop-profile-name'>{username}<FaUserCircle className="shop-profile-image" /></p>
                    <ul className="shop-nav-profile-dropdown">
                      <li><HiShoppingBag /><p>Your Orders</p></li>
                      <li onClick={logOut}><VscSignOut /> <p>Logout</p></li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>

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
