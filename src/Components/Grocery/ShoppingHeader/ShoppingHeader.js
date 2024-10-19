import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ShoppingHeader.css';
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from '../Context/StoreContext';
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import logo from './grocery-basket.png';

const ShoppingHeader = ({ setShowLogin }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { url, token, settoken, username, setUsername } = useContext(StoreContext);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const suggestionRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setUsername]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    settoken("");
    setUsername("");
    navigate("/");
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(url + `/api/product/search?q=${query}`);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

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

  const handleShoppingCartClick = () => {
    navigate('/cart');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalCartItems = Object.values(cartItems).filter(quantity => quantity > 0).length;

  // Add to Cart function for suggestions
  const handleAddToCart = (id) => {
    addToCart(id);
  };

  // Remove from Cart function for suggestions
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

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
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Search"
                />
                {suggestions.length > 0 && (
                  <ul className="items-suggestion-list" ref={suggestionRef}>
                    {suggestions.map((item) => {
                      const currentQuantity = cartItems[item.id] || 0;

                      return (
                        <li key={item.id} className="items-suggestion-item">
                          {item.name}
                          {currentQuantity > 0 ? (
                            <div className="items-add-remove-container">
                              <button
                                className="items-add-remove-button"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                -
                              </button>
                              <span className="item-count">{currentQuantity}</span>
                              <button
                                className="items-add-remove-button"
                                onClick={() => handleAddToCart(item.id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="items-add-remove-button"
                              onClick={() => handleAddToCart(item.id)}
                            >
                              Add
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="nav-items">
                <button className="home-button" onClick={() => handleNavLinkClick('home')}>
                  🏠︎ HOME
                </button>
                {!token ? (
                  <button className="login-button" onClick={() => setShowLogin(2)}>
                    <FaSignInAlt className="icon" /> LOGIN
                  </button>
                ) : (
                  <div className="shop-navbar-profile">
                    <p className='shop-profile-name'>{username}<FaUserCircle className="shop-profile-image" /></p>
                    <ul className="shop-nav-profile-dropdown">
                      <li onClick={()=>navigate('/myOrders')}><HiShoppingBag /><p>Your Orders</p></li>
                      <li onClick={logOut}><VscSignOut /> <p>Logout</p></li>
                    </ul>
                  </div>
                )}
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
