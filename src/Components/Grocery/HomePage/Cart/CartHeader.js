import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CartHeader.css';
import logo from '../../ShoppingHeader/grocery-basket.png';
import { ShoppingCart } from 'lucide-react';

const CartHeader = ({ setShowLogin }) => {    

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

    const handleCartClick = () => {
        navigate('/grocery-home');
    };


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

                            {/* Navigation Icons and Buttons */}
                            <div className="nav-items">
                                <button onClick={handleCartClick} className="nav-shopping-icon">
                                    <ShoppingCart className='nav-shop-cart' />SHOPPING
                                </button>
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
        </>
    );
};

export default CartHeader;
